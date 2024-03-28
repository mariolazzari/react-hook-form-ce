import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type PhNumber = {
  number: string;
};

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: PhNumber[];
  age: number;
  dob: Date;
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
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      username: "Mario",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [
        {
          number: "",
        },
      ],
      age: 49,
      dob: new Date(),
    },
    // defaultValues: getUser,
  });
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const watchUsername = watch("username");

  const onSubmit = (data: FormValues) => {
    console.log("onSubmit", data);
  };

  const onGetValuesClick = () => {
    console.log("get all values", getValues());
    console.log("get username", getValues("username"));
    console.log("get age & dob", getValues(["age", "dob"]));
  };

  const onResetNameClick = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <div>
      <h1>YouTube Form</h1>
      <h2>Watched value: {watchUsername}</h2>

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

        <div className="form-control">
          <label htmlFor="phone-primary">Primary Phone</label>
          <input
            type="text"
            id="phone-primary"
            {...register("phoneNumbers.0")}
          />
          <p className="error">{errors.phoneNumbers?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="phone-secondary">Secondary Phone</label>
          <input
            type="text"
            id="phone-secondary"
            {...register("phoneNumbers.1")}
          />
          <p className="error">{errors.phoneNumbers?.message}</p>
        </div>

        <div>
          <label htmlFor="">Phone numbers list</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button onClick={() => remove(index)}>
                      Remove phone number
                    </button>
                  )}
                </div>
              );
            })}
            <button onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Birth date</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Birth date is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <button type="submit">Submit</button>
        <button onClick={onGetValuesClick}>Get values</button>
        <button onClick={onResetNameClick}>Reset Username</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
