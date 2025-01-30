const Role = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[25px]">Rol Seçimi</h1>

      <div className="flex flex-wrap sm:flex-nowrap gap-5 sm:gap-0 justify-center items-end py-10">
        <button className="border flex justify-center items-center font-bold border-green-500 sm:rounded-tr-3xl h-[150px] w-[300px] bg-green-500 text-white hover:bg-transparent hover:text-green-500 transition">
          Mən Freelanserəm
        </button>
        <button className="border flex justify-center items-center font-bold border-green-500 sm:rounded-tl-3xl h-[150px] sm:h-[200px] w-[300px] text-green-500 hover:bg-green-500 hover:text-white transition">
          Mən İşəgötürənəm
        </button>
      </div>
    </div>
  )
}

export default Role