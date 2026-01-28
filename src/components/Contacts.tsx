import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import bgimg from "../assets/img/contact/1.png";
import { API_BASE_URL } from "../config/api";
const ContactData = {
  title: "Encuentranos",
  title2: "Nuestros Locales",
  btntext: "Enviar",
  ContactinfoList: [
    {
      img: bgimg,
      icon: '<svg class="w-10 h-10 inline-block my-0 mx-auto duration-[0.3s] fill-[#595959]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" xmlSpace="preserve"><path d="M256.98 40.005c-5.53-.04-10.04 4.41-10.08 9.93-.04 5.52 4.4 10.03 9.93 10.07 5.52.04 10.03-4.4 10.07-9.92.04-5.52-4.4-10.03-9.92-10.08zM256.525 100.004c-38.611-.274-70.232 30.875-70.524 69.474-.291 38.597 30.875 70.233 69.474 70.524l.536.002c38.353 0 69.698-31.056 69.988-69.476.291-38.595-30.874-70.233-69.474-70.524zm-.516 120.001l-.384-.002c-27.571-.208-49.833-22.806-49.625-50.375.207-27.445 22.595-49.627 49.991-49.627l.384.002c27.571.208 49.833 22.806 49.625 50.375-.208 27.445-22.595 49.627-49.991 49.627zM299.631 47.589c-5.202-1.846-10.921.879-12.767 6.085-1.845 5.206.88 10.921 6.085 12.767 44.047 15.611 73.402 57.562 73.05 104.389-.041 5.522 4.402 10.033 9.925 10.075h.077c5.486 0 9.956-4.428 9.998-9.925.416-55.347-34.293-104.934-86.368-123.391z" /><path d="M317.357 376.442c66.513-85.615 108.08-130.26 108.641-205.164C426.702 77.035 350.22 0 255.984 0 162.848 0 86.71 75.428 86.002 168.728c-.572 76.935 41.767 121.519 108.739 207.7C128.116 386.384 86.002 411.401 86.002 442c0 20.497 18.946 38.89 53.349 51.79 31.313 11.742 72.74 18.209 116.649 18.209s85.336-6.467 116.649-18.209c34.403-12.901 53.349-31.294 53.349-51.791 0-30.582-42.075-55.593-108.641-65.557zM106.001 168.879C106.625 86.55 173.8 20 255.986 20c83.159 0 150.633 67.988 150.013 151.129-.532 71.134-44.614 114.971-114.991 206.714-12.553 16.356-24.081 31.82-34.993 46.947-10.88-15.136-22.178-30.323-34.919-46.953-73.286-95.584-115.637-136.108-115.095-208.958zM256 492c-85.851 0-149.999-26.397-149.999-50 0-17.504 38.348-39.616 102.826-47.273 14.253 18.701 26.749 35.691 39.005 53.043a9.998 9.998 0 008.159 4.23H256a10 10 0 008.158-4.217c12.14-17.126 24.978-34.535 39.109-53.045 64.418 7.665 102.732 29.77 102.732 47.263C405.998 465.603 341.851 492 256 492z" /></svg>',
      info: '<li class="text-xl text-white font-medium">Av. John F. Kennedy N67 39 y Ramón Chiriboga,</li><li class="text-xl text-white font-medium">Norte - Quito</li>',
      delay: "500",
    },
    {
      img: bgimg,
      icon: '<svg class="w-10 h-10 inline-block my-0 mx-auto duration-[0.3s] fill-[#595959]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" xmlSpace="preserve"><path d="M256.98 40.005c-5.53-.04-10.04 4.41-10.08 9.93-.04 5.52 4.4 10.03 9.93 10.07 5.52.04 10.03-4.4 10.07-9.92.04-5.52-4.4-10.03-9.92-10.08zM256.525 100.004c-38.611-.274-70.232 30.875-70.524 69.474-.291 38.597 30.875 70.233 69.474 70.524l.536.002c38.353 0 69.698-31.056 69.988-69.476.291-38.595-30.874-70.233-69.474-70.524zm-.516 120.001l-.384-.002c-27.571-.208-49.833-22.806-49.625-50.375.207-27.445 22.595-49.627 49.991-49.627l.384.002c27.571.208 49.833 22.806 49.625 50.375-.208 27.445-22.595 49.627-49.991 49.627zM299.631 47.589c-5.202-1.846-10.921.879-12.767 6.085-1.845 5.206.88 10.921 6.085 12.767 44.047 15.611 73.402 57.562 73.05 104.389-.041 5.522 4.402 10.033 9.925 10.075h.077c5.486 0 9.956-4.428 9.998-9.925.416-55.347-34.293-104.934-86.368-123.391z" /><path d="M317.357 376.442c66.513-85.615 108.08-130.26 108.641-205.164C426.702 77.035 350.22 0 255.984 0 162.848 0 86.71 75.428 86.002 168.728c-.572 76.935 41.767 121.519 108.739 207.7C128.116 386.384 86.002 411.401 86.002 442c0 20.497 18.946 38.89 53.349 51.79 31.313 11.742 72.74 18.209 116.649 18.209s85.336-6.467 116.649-18.209c34.403-12.901 53.349-31.294 53.349-51.791 0-30.582-42.075-55.593-108.641-65.557zM106.001 168.879C106.625 86.55 173.8 20 255.986 20c83.159 0 150.633 67.988 150.013 151.129-.532 71.134-44.614 114.971-114.991 206.714-12.553 16.356-24.081 31.82-34.993 46.947-10.88-15.136-22.178-30.323-34.919-46.953-73.286-95.584-115.637-136.108-115.095-208.958zM256 492c-85.851 0-149.999-26.397-149.999-50 0-17.504 38.348-39.616 102.826-47.273 14.253 18.701 26.749 35.691 39.005 53.043a9.998 9.998 0 008.159 4.23H256a10 10 0 008.158-4.217c12.14-17.126 24.978-34.535 39.109-53.045 64.418 7.665 102.732 29.77 102.732 47.263C405.998 465.603 341.851 492 256 492z" /></svg>',
      info: '<li class="text-xl text-white font-medium">Av. Calderon y Los Guabos</li><li class="text-xl text-white font-medium">Sangolquí - Quito</li>',
      delay: "300",
    },
    {
      img: bgimg,
      icon: '<svg class="w-10 h-10 inline-block my-0 mx-auto duration-[0.3s] fill-[#595959]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" xmlSpace="preserve"><path d="M256.98 40.005c-5.53-.04-10.04 4.41-10.08 9.93-.04 5.52 4.4 10.03 9.93 10.07 5.52.04 10.03-4.4 10.07-9.92.04-5.52-4.4-10.03-9.92-10.08zM256.525 100.004c-38.611-.274-70.232 30.875-70.524 69.474-.291 38.597 30.875 70.233 69.474 70.524l.536.002c38.353 0 69.698-31.056 69.988-69.476.291-38.595-30.874-70.233-69.474-70.524zm-.516 120.001l-.384-.002c-27.571-.208-49.833-22.806-49.625-50.375.207-27.445 22.595-49.627 49.991-49.627l.384.002c27.571.208 49.833 22.806 49.625 50.375-.208 27.445-22.595 49.627-49.991 49.627zM299.631 47.589c-5.202-1.846-10.921.879-12.767 6.085-1.845 5.206.88 10.921 6.085 12.767 44.047 15.611 73.402 57.562 73.05 104.389-.041 5.522 4.402 10.033 9.925 10.075h.077c5.486 0 9.956-4.428 9.998-9.925.416-55.347-34.293-104.934-86.368-123.391z" /><path d="M317.357 376.442c66.513-85.615 108.08-130.26 108.641-205.164C426.702 77.035 350.22 0 255.984 0 162.848 0 86.71 75.428 86.002 168.728c-.572 76.935 41.767 121.519 108.739 207.7C128.116 386.384 86.002 411.401 86.002 442c0 20.497 18.946 38.89 53.349 51.79 31.313 11.742 72.74 18.209 116.649 18.209s85.336-6.467 116.649-18.209c34.403-12.901 53.349-31.294 53.349-51.791 0-30.582-42.075-55.593-108.641-65.557zM106.001 168.879C106.625 86.55 173.8 20 255.986 20c83.159 0 150.633 67.988 150.013 151.129-.532 71.134-44.614 114.971-114.991 206.714-12.553 16.356-24.081 31.82-34.993 46.947-10.88-15.136-22.178-30.323-34.919-46.953-73.286-95.584-115.637-136.108-115.095-208.958zM256 492c-85.851 0-149.999-26.397-149.999-50 0-17.504 38.348-39.616 102.826-47.273 14.253 18.701 26.749 35.691 39.005 53.043a9.998 9.998 0 008.159 4.23H256a10 10 0 008.158-4.217c12.14-17.126 24.978-34.535 39.109-53.045 64.418 7.665 102.732 29.77 102.732 47.263C405.998 465.603 341.851 492 256 492z" /></svg>',
      info: '<li class="text-xl text-white font-medium">Av. Mariscal Sucre y Alonso de Angulo</li><li class="text-xl text-white font-medium">Sur - Quito</li>',
      delay: "100",
    },
  ],
};
const Contacts = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    city: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setFormMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        let errorDetail = "";
        try {
          const data = await response.json();
          if (data && typeof data === "object") {
            errorDetail = JSON.stringify(data);
          }
        } catch (parseError) {
          try {
            errorDetail = await response.text();
          } catch (textError) {
            errorDetail = "";
          }
        }
        const extra = errorDetail ? ` (${errorDetail})` : "";
        setFormMessage(
          `No se pudo enviar el mensaje. Intentalo de nuevo.${extra}`
        );
        return;
      }
      setFormMessage("Mensaje enviado correctamente.");
      setFormValues({
        name: "",
        email: "",
        subject: "",
        message: "",
        city: "",
        phone: "",
      });
    } catch (error) {
      setFormMessage("No se pudo enviar el mensaje. Intentalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div id="khalif-contact-area" className="khalif-contact-area my-[110px]">
        <div id="contact-info-area" className="contact-info-area">
          <div className="container">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <div className="section-title-wrape text-center uppercase relative mb-20">
                  <h3 className="my-stroke2">{ContactData.title}</h3>
                  <h4>{ContactData.title2}</h4>
                </div>
              </div>
              {ContactData.ContactinfoList.map((item, i) => (
                <div
                  className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12"
                  data-aos="fade-right"
                  data-aos-delay={item.delay}
                  key={i}
                >
                  <div className="contact-info-box group text-center py-[50px] px-0 !bg-[#070707] rounded-[15px] relative overflow-hidden my-[30px] mx-0 transition-all duration-[0.3s] after:absolute after:content-[''] after:left-0 after:right-0 after:bottom-0 after:w-0 after:h-0 after:my-0 after:mx-auto after:border-l-[30px] after:border-r-[30px] after:border-b-[30px] after:border-solid after:border-x-transparent after:border-b-[#111111] hover:!bg-[#ff5100]">
                    <div className="contact-style-img absolute -top-[50px] -right-[50px]">
                      <img src={item.img} alt="img" />
                    </div>
                    <div
                      className="contact-info-icon inline-block text-center bg-[#111111] rounded-[50%] w-[100px] h-[100px] leading-[100px] relative z-[1] transition-all duration-[0.3s]  after:content-[''] after:absolute after:-left-[15px] after:-right-[15px] after:-bottom-[15px] after:-top-[15px] after:rounded-[50%] after:-z-[1] after:transition-all after:duration-[0.3s] after:border-[1px] after:border-solid after:border-[#111111] group-hover:bg-white group-hover:after:border-white"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></div>
                    <ul
                      className="contact-info mt-[35px]"
                      dangerouslySetInnerHTML={{ __html: item.info }}
                    ></ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          id="contact-map-area"
          className="contact-map-area"
          data-aos="fade-up"
        >
          <div className="container">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <iframe
                  id="khalif-map"
                  className="my-20 w-full h-[400px]"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3989.8108120503657!2d-78.4942966!3d-0.1111557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d585854089a137%3A0x16998902662ecab5!2sAROS%20Y%20LLANTAS%20METAMORFOSIS%20S.A.S!5e0!3m2!1ses!2sec!4v1769552444048!5m2!1ses!2sec"
                  allowFullScreen={true}
                ></iframe>

                
              </div>
            </div>
          </div>
        </div>
        <div
          id="khalif-contact-form-area"
          className="khalif-contact-form-area"
          data-aos="fade-up"
        >
          <form className="khalif-contact-form" onSubmit={handleSubmit}>
            <div className="container">
              <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                  <input
                    className="form-control  rounded-none shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    type="text"
                    name="name"
                    placeholder="Nombres*"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                  <input
                    className="form-control  rounded-none shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    type="email"
                    name="email"
                    placeholder="E-mail *"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                  <input
                    className="form-control  rounded-none shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    type="text"
                    name="city"
                    placeholder="Ciudad *"
                    value={formValues.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12">
                  <input
                    className="form-control  rounded-none shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    type="tel"
                    name="phone"
                    placeholder="Celular *"
                    value={formValues.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12">
                  <input
                    className="form-control  rounded-none shadow-none text-white h-[70px] mb-[30px] bg-[#070707] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    type="text"
                    name="subject"
                    placeholder="Solicitud"
                    value={formValues.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  <textarea
                    className="form-control rounded-none shadow-none text-white h-[200px] mb-[30px] bg-[#070707] p-[15px] border-[1px] border-solid border-[#595959] w-full focus:!ring-[none] focus:!border-[#595959] focus:border-solid focus:!outline-offset-0  focus:outline-0"
                    name="message"
                    cols="30"
                    rows="8"
                    placeholder="Mensaje detalle su producto o pregunta"
                    value={formValues.message}
                    onChange={handleChange}
                  ></textarea>
                  <Tilt className="inline-block" scale={1.1}>
                    <button
                      type="submit"
                      className="btn-2 bgc-2 text-center text-uppercase btn-tilt mt-[30px]"
                      disabled={isSubmitting}
                    >
                      <span>
                        <svg
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 95.91"
                        >
                          <path
                            d="M259.88 468.09l-52 45.93-5.1-5.52 43.33-38.41H131.88v-8h114.21l-43.25-38.36 5-5.62 52.06 46z"
                            transform="translate(-131.88 -418.11)"
                          />
                        </svg>
                      </span>
                      {ContactData.btntext}
                    </button>
                  </Tilt>
                </div>
              </div>
              {formMessage && (
                <p className="form-message float-left mt-[15px]">
                  {formMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contacts;
