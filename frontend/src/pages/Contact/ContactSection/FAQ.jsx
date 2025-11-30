import { faqData } from "./contactData";

const FAQ = () => {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-grid">
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
