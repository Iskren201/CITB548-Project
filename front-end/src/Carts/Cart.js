import React from "react";

const Cart = () => {
  const data = [
    {
      name: "Красна поляна",
      addres: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      imgAddress:
        "https://media.istockphoto.com/id/1410270664/photo/modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plants.jpg?s=2048x2048&w=is&k=20&c=y35OCozepqHeKrDwNYL3ieZmhDZJb-BLS7x7JXD2bFg=",
      addresName: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      googleLink: "https://www.google.com/",
    },
    {
      name: "Красна поляна",
      addres: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      imgAddress:
        "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D",
      addresName: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      googleLink: "https://www.google.com/",
    },
    {
      name: "Красна поляна",
      addres: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      imgAddress:
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D",
      addresName: "жк. Красна поляна-3, ул, до бл 31Б, 1118 Колю Фичето, София",
      googleLink: "https://www.google.com/",
    },
  ];

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container mx-auto flex flex-wrap justify-around">
        {data.map((item) => (
          <div
            key={item.name}
            className="max-w-sm p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="card flex flex-col justify-center p-6 sm:p-10 bg-white rounded-lg shadow-2xl">
              <div className="prod-title">
                <p className="text-lg sm:text-2xl uppercase text-gray-900 font-bold mb-2">
                  {item.name}
                </p>
                <p className="text-sm sm:text-base uppercase text-gray-400 mb-4">
                  {item.addresName}
                </p>
              </div>
              <div className="prod-img">
                <img
                  src={item.imgAddress}
                  className="w-full object-cover object-center h-full"
                  alt={item.name}
                />
              </div>
              <div className="prod-info grid gap-4 sm:gap-10">
                <div></div>
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-900">
                  <a
                    href={item.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-base sm:text-xl"
                  >
                    Test
                  </a>
                  <button className="px-4 sm:px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none text-sm sm:text-base">
                    Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
