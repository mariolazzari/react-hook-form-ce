import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

// const getUser = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
//   const data = await res.json();
//   const user: FormValues = {
//     username: data.name,
//     email: data.email,
//     channel: "",
//   };

//   return user;
// };

export const YouTubeForm = () => {
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
    // defaultValues: getUser,
  });
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("onSubmit", data);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid mail format",
              },
              required: {
                value: true,
                message: "Mail is required",
              },
              validate: {
                notAdmin: fieldValue => {
                  return (
                    fieldValue !== "admin@example.com" || "Mail not allowed"
                  );
                },
                notBlackList: fieldValue => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "Domain not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
