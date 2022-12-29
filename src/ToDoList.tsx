import { useState } from "react";

import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write To-Do" })}
          placeholder="Write a To Do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

// function ToDoList() {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       return setError(
//         "password1",
//         { message: "Passwords are not matching." },
//         { shouldFocus: true }
//       );
//     }
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("firstName", {
//             required: "First Name is required",
//             validate: {
//               noNico: (value) =>
//                 value.includes("nico")
//                   ? "You can't have 'nico' in your first name"
//                   : true,
//               noNick: (value) =>
//                 value.includes("nick")
//                   ? "You can't have 'nick' in your first name"
//                   : true,
//             },
//             minLength: { value: 10, message: "Your First Name is too short" },
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>
//         <input
//           {...register("lastName", {
//             required: "Last Name is required",
//             minLength: { value: 10, message: "Your Last Name is too short" },
//           })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only Naver.com is allowed",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 10,
//               message: "Password is too short",
//             },
//           })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>
//         <input
//           {...register("password1", {
//             required: "Password confirmation is required",
//             minLength: {
//               value: 10,
//               message: "Password is too short",
//             },
//           })}
//           placeholder="Password Confirmation"
//         />
//         <span>{errors?.password1?.message}</span>

//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
