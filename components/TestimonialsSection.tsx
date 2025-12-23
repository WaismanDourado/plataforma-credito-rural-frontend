import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "João Silva, Agricultor",
    text: "Revolucionou meu acesso a crédito!",
    image: "/images/user1.jpg",
    rating: 5,
  },
  {
    name: "Maria Oliveira, Banco Rural",
    text: "Previsões precisas reduziram riscos em 40%!",
    image: "/images/user2.jpg",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-8">
          O Que Nossos Usuários Dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <p className="italic mb-4 text-gray-500">{testimonial.text}</p>
              <p className="text-gray-700 font-bold font-semibold">
                {testimonial.name}
              </p>
              <div className="text-yellow-500">
                {"★".repeat(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
