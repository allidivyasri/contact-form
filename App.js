import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', topic: '', message: ''
  });
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setConfirmation("Thank you! We’ve received your message.");
      setFormData({ name: '', email: '', phone: '', topic: '', message: '' });
    } catch (error) {
      setConfirmation("There was an error. Please try again.");
    }
  };
return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
      <select name="topic" value={formData.topic} onChange={handleChange} required>
        <option value="">Select a Topic</option>
        <option value="Support">Support</option>
        <option value="Sales">Sales</option>
        <option value="General">General</option>
      </select>
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
      <button type="submit">Submit</button>
      <p>{confirmation}</p>
    </form>
  );
};

export default ContactForm;