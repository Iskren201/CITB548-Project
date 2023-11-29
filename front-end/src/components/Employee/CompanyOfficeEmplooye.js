import React from "react";

const CompanyOfficeEmplooye = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center mt-4 rounded-lg">
            <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 mx-auto mb-8 md:mb-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93836.3793592443!2d23.24154649889014!3d42.69552878948575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2z0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1701257010611!5m2!1sbg!2sbg"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map 1"
                ></iframe>
                <div className="text-center md:text-left mt-4">
                    Sofia
                </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 mx-auto ml-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47332.56786875961!2d24.69967482779488!3d42.144177171479754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd108a248763d%3A0x6470d1fa6f1338a0!2z0J_Qu9C-0LLQtNC40LI!5e0!3m2!1sbg!2sbg!4v1701257151923!5m2!1sbg!2sbg"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map 2"
                ></iframe>
                <div className="text-center md:text-left mt-4">
                    Plovdiv
                </div>
            </div>
        </div>
    );
};

export default CompanyOfficeEmplooye;
