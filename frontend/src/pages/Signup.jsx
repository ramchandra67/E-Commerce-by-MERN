import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:""
  })
  const [msg,setMsg]=useState("");

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response=await api.post("/auth/signup",form);
      setMsg(response.data.message);
    } catch(err){
      setMsg(err.response?.data?.message || "An error occurred" );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div  className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name='name'
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name='email'
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name='password'
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
// // This is for amazone signin look
// import { useState } from "react";
// import api from "../api/axios";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/auth/signup", form);
//       setMsg(response.data.message);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-white pt-8 px-4 font-sans text-[#111]">
//       <div className="mb-4 text-3xl font-bold tracking-tighter">
//         amazon<span className="text-sm font-normal">.in</span>
//       </div>

//       <div className="border border-gray-300 p-6 rounded-lg w-full max-w-[350px] shadow-sm">
//         <h2 className="text-2xl font-normal mb-5">Create Account</h2>

//         {msg && (
//           <div className="mb-4 text-sm p-3 border border-red-400 bg-red-50 text-red-700 rounded">
//             {msg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label className="block text-sm font-bold mb-1">Your name</label>
//             <input
//               name="name"
//               type="text"
//               placeholder="First and last name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full px-3 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold mb-1">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-3 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold mb-1">Password</label>
//             <input
//               name="password"
//               type="password"
//               placeholder="At least 6 characters"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-3 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//             <p className="text-[12px] text-gray-600 mt-1 italic">ⓘ Passwords must be at least 6 characters.</p>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#f0c14b] border border-[#a88734] py-1.5 rounded-sm shadow-sm text-sm hover:bg-[#f4d078] active:bg-[#e79e0f] transition-all cursor-pointer"
//           >
//             Continue
//           </button>
//         </form>

//         <div className="mt-6 text-[12px] text-gray-700 border-t border-gray-100 pt-4 leading-tight">
//           By creating an account, you agree to Amazon's <span className="text-blue-700 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-700 hover:underline cursor-pointer">Privacy Notice</span>.
//         </div>
//       </div>
//     </div>
//   );
// }