import { Response } from "@/types/response.types";
import { getSession } from "next-auth/react";
import { getLocale } from "next-intl/server";

// Request interceptor type: receives and returns request config
type RequestConfig = Parameters<typeof fetch>["1"] & { url?: string };
// Response interceptor type: receives and returns response
type ResponseData<T> = Response<T> | null;

type GetOptions = Omit<Parameters<typeof fetch>[1], "body"> & {
  params?: Record<string, string | number | undefined | null>;
};

class Interceptor<T> {
  interceptors: ((value: T) => T | Promise<T>)[];

  constructor() {
    this.interceptors = [];
  }

  use(callback: (value: T) => T | Promise<T>) {
    this.interceptors.push(callback);
  }

  async run(value: T): Promise<T> {
    let result: T = value;
    // Run interceptors sequentially (like axios)
    for (const interceptor of this.interceptors) {
      result = await interceptor(result);
    }
    return result;
  }
}

export class Api {
  baseRoute: string;
  requestInterceptor: Interceptor<RequestConfig>;
  responseInterceptor: Interceptor<ResponseData<any>>;

  constructor() {
    this.baseRoute = "https://dash-learn.dev.qutell.net/api";

    this.requestInterceptor = new Interceptor<RequestConfig>();
    this.responseInterceptor = new Interceptor<ResponseData<any>>();
  }

  static routes = {
    site: {
      sliders: "/site/sliders",
      myCourses: "/site/my_courses",
      myWishlists: "/site/wishlists",
      courses: "/site/courses",
      courseReview: "/site/courses/review",
      reviews: "/site/reviews",
      courses_qa: "/site/courses_qa",
      blogs: "/site/blogs",
      stats: "/site/home_statistics",
      topCategories: "/site/categories/top",
      hero: "/site/hero_section",
      instructors: "/site/instructors",
      partners: "/site/partners",
      about: "/site/about_us",
      testimonials: "/site/testimonials",
      settings: "/site/settings",
      contact_us: "/site/contact_us",
      newsLetter: "/site/newsletter/subscribe",
      cart: "/site/cartItems",
      list: "/site",
      coupon: "/site/coupons/validate",
      enrollments: "/site/enrollments",
      quizzes: "/site/quizzes",
      quizAttempts: "/site/quiz-attempts"
    },
    auth: {
      login: "/site/login",
      register: "/site/register",
      sendOtp: "/send_otp",
      checkOtp: "/check_otp",
      resendOtp: "/resend_otp",
      resetPassword: "/reset_password",
    },
    user: {
      me: "me",
      update: "update_profile",
      changePassword: "change_password",
    },
  };

  async request<T>(
    route: string,
    options?: Parameters<typeof fetch>["1"]
  ): Promise<ResponseData<T>> {
    try {
      const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
      const url = this.baseRoute.concat(normalizedRoute);

      // Build initial request config
      let requestConfig: RequestConfig = {
        ...options,
        url,
      };

      // Run request interceptors
      requestConfig = await this.requestInterceptor.run(requestConfig);

      try {
        const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
        const url = this.baseRoute.concat(normalizedRoute);

        // Build initial request config
        let requestConfig: RequestConfig = {
          ...options,
          url,
        };

        // Run request interceptors
        requestConfig = await this.requestInterceptor.run(requestConfig);

        // Extract url from config (interceptors might have modified it)
        const { url: finalUrl, ...fetchOptions } = requestConfig;
        const headers = new Headers(fetchOptions.headers);
        headers.append("Accept", "application/json, text/*, */*");
        const finalFetchUrl = finalUrl || url;

        // Make the actual request
        const response = await fetch(finalFetchUrl, {
          ...fetchOptions,
          headers: headers,
        });

        // Parse response
        let responseData: ResponseData<T>;
        if (response.ok) {
          const jsonData = (await response.json()) as Response<T>;
          responseData = jsonData;
        } else {
          // Handle error responses
          let errorData: Response<T>;
          try {
            errorData = (await response.json()) as Response<T>;
          } catch {
            errorData = {
              data: {} as T,
              errors: { message: response.statusText },
              message: `Request failed with status ${response.status}`,
              status: false,
            };
          }
          responseData = errorData;
        }

        // run the response interceptors in both ways, success and fail
        responseData = await this.responseInterceptor.run(responseData);
        if (!response.ok)
          throw {
            response: responseData,
          };

        return responseData;
      } catch (error) {
        console.log(error);
        if (
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response
        )
          throw error;
        // Handle network errors or interceptor errors
        const errorResponse: ResponseData<T> = {
          data: {} as T,
          errors: error,
          message:
            error instanceof Error ? error.message : "Network error occurred",
          status: false,
        };

        // Run response interceptors even for errors
        const finalError = await this.responseInterceptor.run(errorResponse);
        throw finalError;
      }
    } catch (error) {
      throw error;
    }
  }

  async get<T>(route: string, options?: GetOptions) {
    let url = route;
    if (options?.params) {
      const searchParams = new URLSearchParams();

      Object.entries(options.params).forEach(([key, value]) => {
        if (value) {
          let finalValue = value;

          if (
            typeof value === "string" &&
            value.startsWith("[") &&
            value.endsWith("]")
          ) {
            try {
              finalValue = JSON.parse(value);
            } catch (e) {
              finalValue = value;
            }
          }

          if (Array.isArray(finalValue)) {
            finalValue.forEach((v) => {
              if (v !== "" && v !== undefined && v !== null) {
                searchParams.append(key, String(v));
              }
            });
          } else {
            if (finalValue !== "") {
              searchParams.append(key, String(finalValue));
            }
          }
        }
      });

      const queryString = searchParams.toString();
      if (queryString) {
        url += url.includes("?") ? "&" + queryString : "?" + queryString;
      }
    }

    const { params, ...fetchOptions } = options || {};
    return this.request<T>(url, { ...fetchOptions, method: "GET" });
  }

  // async post<T>(
  //   route: string,
  //   body: object = {},
  //   options?: Parameters<typeof fetch>["1"]
  // ) {
  //   const headers = new Headers(options?.headers);

  //   if (headers.get("Content-Type") === "multipart/form-data") {
  //     const formData = new FormData();

  //     Object.keys(body).forEach((key) => {
  //       formData.append(key, body[key as keyof typeof body]);
  //     });

  //     return this.request<T>(route, {
  //       ...options,
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(options?.headers || {}),
  //       },
  //     });
  //   } else {
  //     return this.request<T>(route, {
  //       ...options,
  //       method: "POST",
  //       body: JSON.stringify(body),
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(options?.headers || {}),
  //       },
  //     });
  //   }
  // }
  // داخل Api.post
  async post<T>(
    route: string,
    body: Record<string, any> = {},
    options?: Parameters<typeof fetch>["1"]
  ) {
    const headers = new Headers(options?.headers);

    // ✅ لو عايز تبعت FormData: استخدم header "multipart/form-data" كـ signal بس
    if (headers.get("Content-Type") === "multipart/form-data") {
      const formData = new FormData();

      Object.entries(body ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        formData.append(key, String(value));
      });

      // ✅ مهم: نشيل Content-Type عشان المتصفح يضيف boundary
      headers.delete("Content-Type");

      return this.request<T>(route, {
        ...options,
        method: "POST",
        body: formData,
        headers,
      });
    }

    return this.request<T>(route, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
  }

  async delete<T>(route: string, options?: Parameters<typeof fetch>["1"]) {
    return this.request<T>(route, { ...options, method: "DELETE" });
  }
  async put<T>(
    route: string,
    body: any = {},
    options?: Parameters<typeof fetch>["1"]
  ) {
    const headers = new Headers(options?.headers);

    if (body instanceof FormData) {
      headers.delete("Content-Type");

      return this.request<T>(route, {
        ...options,
        method: "PUT",
        body,
        headers,
      });
    }

    if (headers.get("Content-Type") === "multipart/form-data") {
      const formData = new FormData();

      Object.entries(body ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        // arrays
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v === undefined || v === null) return;
            formData.append(`${key}[]`, v as any);
          });
          return;
        }

        formData.append(key, value as any);
      });

      headers.delete("Content-Type");

      return this.request<T>(route, {
        ...options,
        method: "PUT",
        body: formData,
        headers,
      });
    }

    headers.set("Content-Type", "application/json");

    return this.request<T>(route, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }
}

const api = new Api();

api.requestInterceptor.use(async (requestOptions) => {
  // Read locale from cookie dynamically on each request
  let language = "en";
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    for (const entry of cookies) {
      const trimmed = entry.trim();
      const [key, value] = trimmed.split("=");
      if (key === "NEXT_LOCALE" && value) {
        language = value.trim();
        break;
      }
    }
  } else {
    const serverLanguage = await getLocale();
    if (serverLanguage) language = serverLanguage.trim();
  }

  //Create new headers object to avoid mutating the original
  const headers = new Headers(requestOptions.headers);

  // Use set instead of append to avoid duplicates and ensure fresh value
  headers.set("Accept-Language", language);
  headers.set("Lang", language);

  requestOptions.headers = headers;
  return requestOptions;
});

api.requestInterceptor.use(async (requestOptions) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    if (session) {
      const headers = new Headers(requestOptions.headers);
      headers.append("Authorization", `Bearer ${session.user.token}`);
      requestOptions.headers = headers;
    }
  }
  return requestOptions;
});

export default api;
