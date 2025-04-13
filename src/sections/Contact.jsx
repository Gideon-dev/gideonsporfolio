import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message:''
    });
    const [loading, setLoading] = useState(false);
    const handleChange = ({target: {name, value}})=>{
        setForm({...form, [name]: value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);

        try{
            await emailjs.send(
                'service_5gxmrga',
                'template_crntev3',
            {
                from_name: form.name,
                to_name: 'Gideon',
                from_email: form.email,
                to_email: 'adeniranakinloluwa2000@gmail.com',
                message: form.message
            },
            'Sc7QRvbXMIizmmh4e'
            );
            setLoading(false);
            alert('Your message has been sent');
            setForm(
                {
                    name: '',
                    email: '',
                    message: ''
                }
            )
        }catch(error){
            setLoading(false);
            console.log(error);
            alert('something went wrong!, Try again')
        }
        
    }
  return (
    <section className="c-space my-20">
        <div className="relative min-h-screen flex items-center justify-center flex-col">
            <img src="/assets/terminal.png" alt="terminal" className="absolute inset-0 min-h-screen"/>
            <div className="contact-container">
                <h3 className="head-text"> Let's Talk </h3>   
                <p className="text-lg text-white-600 mt-3">
                    Whether you are looking to build a new website, improve your existing platform, 
                    or bring a unique project to life, I'm here to help.
                </p>
                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                    <label className="space-y-3">
                        <span className="field-label">
                            Full Name
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="field-input"
                        />
                    </label>
                    <label className="space-y-3">
                        <span className="field-label">
                            Email
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="JohnDoe@gmail.com"
                            className="field-input"
                        />
                    </label>
                    <label className="space-y-3">
                        <span className="field-label">
                            Your Message
                        </span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Hi, I like your work and I want to offer you a job..."
                            className="field-input"
                        />
                    </label>
                    <button className="field-btn" type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                        <img src="/assets/arrow-up.png" alt="arrow" className="field-btn_arrow"/>
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact