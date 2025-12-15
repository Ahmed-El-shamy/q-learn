import { useForm } from "react-hook-form";
import { ContactPayload, ContactSchema } from "../_schema/ContactSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useContact = () => {
  const methods = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
  });

  async function handleSubmit(payload: ContactPayload) {
    if (payload.name && payload.email) {
      console.log("OK !!!");
    } else {
      console.log("Not OK !!!");
    }
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};

export default useContact;
