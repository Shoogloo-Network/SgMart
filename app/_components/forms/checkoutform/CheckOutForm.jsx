'use client'
import React , {useState,useEffect,useRef} from 'react'
// import Autosuggest from 'react-autosuggest';
import styles from './CheckOutForm.module.css'

const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
const countries = ['United States', 'Canada', 'Mexico', 'India', 'China'];
const pinCodes = ['10001', '20001', '30001', '40001', '50001'];

const countriesPhn = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

const CheckOutForm = ({onClick , data}) => {
   // State for form inputs
  const [email, setEmail] = useState('');
  const [subscribeOffers, setSubscribeOffers] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [add, setAdd] = useState('');
  const[ state, setState] = useState('');
  const[ country , setCountry] = useState('');
  const[pincode , setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesPhn[0]);
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [hoveredAddressId, setHoveredAddressId] = useState(null);
  const inputRef = useRef();
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    // Retrieve stored addresses from localStorage
    const storedAddresses = JSON.parse(localStorage.getItem('addresses'));
    if (storedAddresses) {
        setAddresses(storedAddresses);
    }
}, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = {
        email,
        add,
        firstName,
        lastName,
        phone,
        city,
        state,
        country,
        pincode,
        paymentMethod,
        agreeTerms,
    };
    const newAddress = { ...formData, id: addresses.length + 1 };

    // Update the addresses state and localStorage
    setAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses, newAddress].slice(-2);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        return updatedAddresses;
    });

    console.log('Form Data:', formData);
    onClick();
      console.log('Form is valid. Submitting...');
    } else {
      console.log('Form has errors.');
    }
  
};


 

    const handleInputChange = (value, type) => {
        if (type === 'state') {
            setState(value);
           
            if(inputRef.current){
              setStateSuggestions(states.filter(state => state.toLowerCase().includes(value.toLowerCase())));
            }

            setCountrySuggestions([]);
            setPincodeSuggestions([]);

        } else if (type === 'country') {
            setCountry(value);
            setCountrySuggestions(countries.filter(country => country.toLowerCase().includes(value.toLowerCase())));
            setPincodeSuggestions([]);
            setStateSuggestions([]);
        } else if (type === 'pincode') {
            setPincode(value);
            setPincodeSuggestions(pinCodes.filter(pincode => pincode.includes(value)));
            setStateSuggestions([]);
            setCountrySuggestions([]);
        }
    };

    const handleSuggestionClick = (value, type) => {
        if (type === 'state') {
            setState(value);
            setStateSuggestions([]);
        } else if (type === 'country') {
            setCountry(value);
            setCountrySuggestions([]);
        } else if (type === 'pincode') {
            setPincode(value);
            setPincodeSuggestions([]);
        }
    };

    const handleCountryChange = (e) => {
      const selectedCountry = e.target.value;
      setCountry(selectedCountry);
    };


 




// const storedFormData = JSON.parse(localStorage.getItem('formData'));
// console.log('Retrieved Form Data:', storedFormData);

const handleAddressClick = (address)=>{
setFirstName(address.firstName);
setLastName(address.lastName);
setPhone(address.phone);
setCity(address.city);
setAdd(address.add);
setState(address.state);
setCountry(address.country);
setPincode(address.pincode);


}

const handleMouseEnter = (id) => {
    setHoveredAddressId(id);
    console.log(id)
};

const handleMouseLeave = () => {
    setHoveredAddressId(null);
};


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const validatePincode = (pincode) => {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode);
};

const handleValidation = () => {
  let tempErrors = {};
  let isValid = true;

  if (!validateEmail(email)) {
    tempErrors['email'] = 'Invalid email address';
    isValid = false;
  }
  if (!firstName) {
    tempErrors['firstName'] = 'First Name is required';
    isValid = false;
  }
  if (!lastName) {
    tempErrors['lastName'] = 'Last Name is required';
    isValid = false;
  }
  if (!validatePhone(phone)) {
    tempErrors['phone'] = 'Invalid phone number';
    isValid = false;
  }
  if (!city) {
    tempErrors['city'] = 'City is required';
    isValid = false;
  }
  if (!add) {
    tempErrors['add'] = 'Address is required';
    isValid = false;
  }
  if (!state) {
    tempErrors['state'] = 'State is required';
    isValid = false;
  }
  if (!country) {
    tempErrors['country'] = 'Country is required';
    isValid = false;
  }
  if (!validatePincode(pincode)) {
    tempErrors['pincode'] = 'Invalid pincode';
    isValid = false;
  }

  setErrors(tempErrors);
  return isValid;
};

  return (
    <section className="user-details-section ">
      <div className="checkout-container">
        {/* Checkout Form */}
        <div className="checkout-form">
          {/* Contact Section */}
          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="form-group notFormGroup">
              <label htmlFor="login-email" className="txtsize">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter your email address"
                className="txtsize"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-group txtsize">
                <input
                  type="checkbox"
                  id="subscribe-offers"
                  checked={subscribeOffers}
                  className="txtsize"
                  style={{ width: 'auto' }}
                  onChange={() => setSubscribeOffers(!subscribeOffers)}
                />
                <label htmlFor="subscribe-offers" className="txtsize checkbox-margin">
                  Email me with news and offers
                </label>
              </div>
            
            </div>
            <div className={styles.cardContainer}>
                {addresses && addresses.length > 0  ? (
                    addresses.map((address, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => handleAddressClick(address)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <h2 style={{marginBottom:"0",textAlign:'right'}}>{`Existing Address ${index + 1}`}</h2>
                            <div className={`${styles.hiddenDiv} ${hoveredAddressId === index ? styles.visibleDiv : ''}`}> <p>{address.add}</p>
                            <p>{address.city}, {address.state}</p>
                            <p>{address.country}</p></div>
                        </div>
                    ))) : <div></div>}
                    </div>

          </div>
          {/* Delivery Section */}
          <div className="delivery-section">
            <h3>Address</h3>
            <div className="two-col two-col-name">
              <div className="form-group notFormGroup">
                <label htmlFor="first-name" className="txtsize">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="First Name"
                  className="txtsize"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group notFormGroup txtsize">
                <label htmlFor="last-name" className="txtsize">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="two-col two-col-name">
            <div className="form-group notFormGroup txtsize">
            <label htmlFor="phone">Phone</label>
            <div className="telephonecheckout">
                <select
                    className={styles.countrycodecheckout}
                    value={selectedCountry.code}
                    onChange={handleCountryChange}
                >
                    {countriesPhn.map((country, index) => (
                        <option key={index} value={country.code}>
                            {country.flag} {country.code}
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className={styles.phcheckout}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
        </div>

              <div className="form-group notFormGroup txtsize">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

          
           
            <div className="form-group notFormGroup">
            <label htmlFor="login-email" className="txtsize">Address</label>
              <input
                type="text"
                id="login-address"
                placeholder="Enter your current address"
                className="txtsize"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
              </div>
          </div>
          <div className="two-col two-col-name">
            <div className="form-group notFormGroup txtsize">
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    id="state"
                    placeholder="Enter your State"
                    required
                    value={state}
                    ref={inputRef}
                    onChange={(e) => handleInputChange(e.target.value, 'state')}
                />
                { stateSuggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                        {stateSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion, 'state')}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="form-group notFormGroup txtsize">
                <label htmlFor="country">Country</label>
               

<select onChange={handleCountryChange} value={country} className='selectCountry'>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="America">America</option>
      </select>
                {countrySuggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                        {countrySuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion, 'country')}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="form-group notFormGroup txtsize pindesktop">
                <label htmlFor="pincode">Pin Code</label>
                <input
                    type="text"
                    id="pincode"
                    placeholder="Enter your Pin Code"
                    required
                    value={pincode}
                    onChange={(e) => handleInputChange(e.target.value, 'pincode')}
                />
                {pincodeSuggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                        {pincodeSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion, 'pincode')}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <div className="form-group notFormGroup txtsize pinmobile">
                <label htmlFor="pincode">Pin Code</label>
                <input
                    type="text"
                    id="pincode"
                    placeholder="Enter your Pin Code"
                    required
                    value={pincode}
                    onChange={(e) => handleInputChange(e.target.value, 'pincode')}
                />
                {pincodeSuggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                        {pincodeSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion, 'pincode')}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="order-item">
            <div className="order-item-image">
              <img
                src={data?.img}
                alt={data?.title}
              />
              <div>
                <span>{data?.title}</span>
                <div className="discount">
                  <span>{data?.percentageOff} DISCOUNT AUTO APPLIED.</span>
                </div>
              </div>
            </div>
            <div className="price-span">
              <span>₹{data?.price}</span>
              <span>-₹{data?.price - data?.disPrice}</span>
            </div>
          </div>

          <div className="order-item-list">
            <div className="order-item">
              <span>Subtotal</span>
              <span>₹{data?.disPrice}</span>
            </div>
            <div className="order-item">
              <span>Shipping</span>
              <span>₹40.00</span>
            </div>
           
            <div className="order-item">
              <span>GST(18%)</span>
              <span>₹{(data?.disPrice * 18)/100}</span>
            </div>
            <hr />
            <div className="order-item total-price">
              <span>Total</span>
              <span>₹{Number(data?.disPrice ) + 40 + Number((data?.disPrice * 18)/100)}</span>
            </div>
          </div>

          <div className="payment-section">
            <h3>Payment</h3>
            <p>All transactions are secure and encrypted.</p>
           {
            [...Array(2)].map((_,index)=>(
                <div key={index}>
                <div className="payment-method" >
              <input
                type="radio"
                name="payment"
                value="razorpay"
                id="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={() => setPaymentMethod('razorpay')}
              />
              <label htmlFor="razorpay">
                Razorpay Secure (UPI, Cards, Wallets, NetBanking)
              </label>
              <span className="razorpayImg">
                <img src="images/upi.svg" alt="UPI" />
                <img src="images/visa.svg" alt="Visa" />
                <img src="images/master.svg" alt="MasterCard" />
                
              </span>
             
            </div>
            <hr/>
                </div>
            
            ))
           }
          </div>
       <button  className={styles.button} onClick={handleSubmit}>Make Payment</button> 
          <div className="form-group notFormGroup termsGroup" style={{display:'flex',gap:'10px'}}>
            <input
              type="checkbox"
              id="terms-conditions"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <label htmlFor="terms-conditions">
              I agree to the Terms & Conditions
            </label>
          </div>
        </div>
        
      </div>


      <style jsx>{`

      hr{
      margin-bottom:5px;
      }
/* Checkout Container */
.pinmobile{
display:none;}

.pindesktop{
display:block;}

.user-details-section {
margin: 10px auto;
width:1200px;
}
.checkout-container {
    
   margin: 20px 0;
    display: flex;
    gap: 10px;
}

/* Left Column: Checkout Form */
.checkout-form {
    flex: 1;
    background-color: #ffffff;
    padding: 25px;
    padding-top: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 50vw;
    padding-bottom: 34px;
}

.checkout-form h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #2c3e50;
    border-bottom: 1px solid #3498db;
    padding-bottom: 10px;
}

.delivery-section h3{
    /* font-size: 16px; */
}
.delivery-section{
    margin-top: 10px;
}
.form-group {
    margin-bottom: 10px;
}

.form-group label {
    font-weight: bold;
    // margin-bottom: 5px;
    color: #34495e;
}

.form-group input,
.form-group select {
    /* width: 100%; */
    padding: 6px;
    border: 1px solid #ccc;
    // border-radius: 5px;
    transition: border-color 0.3s;
    font-size: 15px;
}


.form-group input:focus,
.form-group select:focus {
    border-color: #3498db;
    outline: none;
}

/* Right Column: Order Summary */
.order-summary {
    flex: 1;
    background-color: #ffffff;
    padding: 25px;
    padding-top: 10px;
    padding-bottom: 8px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   
    width: 40%;
}

.order-summary h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #2c3e50;
    border-bottom: 1px solid #3498db;
    padding-bottom: 10px;
}

.order-item {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    margin-bottom: 8px;
    font-size: 14px;
}

.order-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
}

.order-item-description {
    flex-grow: 1;
    margin-left: 10px;
}

.total-price {
    font-weight: bold;
    font-size: 16px;
    color: #e74c3c; /* Red for total price */
    margin-top: 10px;
}

.savings {
    color: #e74c3c; /* Red color for savings */
}

/* Payment Section */
.payment-section {
    margin-top: 144px;
    font-size: 14px;
}

.payment-section h3 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #34495e;
}

.payment-section p{
    margin-top: 10px;
    margin-bottom: 10px;
}

.payment-method {
    display: flex;
    align-items: center;
    flex-wrap:wrap;
    margin-bottom: 15px;
   
}

.payment-method input {
    margin-right: 10px;
    cursor: pointer;
}






.payment-section p{
  margin-top: 2px;
}
.payment-section h3{
  margin-bottom: 5px;
}
.form-group:not(.notFormGroup){
/* width: auto; */
    display: flex;
    gap: 10px;
    align-items: center;

}

.notFormGroup input{
    // width: 100% ;
}


.order-item-image{
    display: flex;
    gap: 10px;
    /* align-items: center; */
}

.order-item-list{
    width: 62%;
    float: right;
    font-size: 14px;
}

.discount{
    font-size: 12px;
}


.razorpayImg{
    margin-left: 10px;
    /* padding-right: 5px; */
    display:flex;
}


.two-col-name{
    display: flex;
    /* justify-content: space-between; */
    gap: 30px;
}

#first-name,#last-name{
    width: 170%;
}

#phone,#gender{
    width: 170%;
}


.three-col{
    display: flex;
    gap: 48px;
    justify-content: stretch;
}





.price-span{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}


.checkbox-margin{
    margin-bottom: 0 !important;
    font-weight: 400 !important;
    font-size: 12px;
   
}


#login-email{
    margin-bottom: 3px;
    width:100%;
}



.two-col {
    display: flex !important; /* Use flexbox to allow items to be flexible */
    justify-content: space-between !important; /* Space between the two columns */
}

.two-col .form-group {
    width: 50% !important; /* Set each form group inside .two-col to 50% width */
}

.delivery-section .form-group:not(.two-col .form-group) {
    width: 100% !important; /* Set other form groups to 100% width */
}

.delivery-section input {
    width: 100% !important; /* Ensure inputs are full width */
    box-sizing: border-box !important; /* Include padding/border in width */
}

.hidden {
  display: none ;
 
}

.mobileBtnContact{
  display: none;
}
.mobileBtnAddress{
  display: none;
}
.gendercheckout{
    display: flex;
                      align-items: center;
                      margin-top: 6px;
                      border: 1px solid #ccc;
                      padding: 9px;
                      border-radius: 5px;
}
.malecheckout{
    width: 15% !important;
}
.femalecheckout{
    margin-left: 15px; width: 15% !important
}
.telephonecheckout{
    display: flex; align-items: center
}
.countrycodecheckout{
    padding: 12px;
                        border-right: none;
                        background-color: #f1f1f1;
                        border: 1px solid #ccc;
                        border-right: none;
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                        width:auto;
                        
}
.phcheckout{
    border: 1px solid #ccc !important;
 border-left: none !important;
                        border-top-left-radius: 0 !important;
                        border-bottom-left-radius: 0 !important;

}

.form-group label {
    font-weight:normal;
    // margin-bottom: 5px;
    color: #34495e;
}

h3{
font-weight : bold ;
}
/* Responsive Styles */
@media (max-width: 768px) {

.telephonecheckout > select{
width:42%;
}
    .countrycodecheckout{
        font-size: 14px;
        width:42%;
    }
    .checkout-container {
        flex-direction: column;
        margin : 0;
    }
    

   
}
@media (min-width: 769px) { /* Adjust the width as needed */
  .hidden {
      display: block; /* Show sections on desktop */
  }

      }
/* Mobile Styles */
@media only screen and (max-width: 768px) {
.pinmobile{
display:block;}
.pindesktop{
display:none;}
.user-details-section{
margin : 0;
}
.user-details-section{
  padding: 10px;
  width: auto;
  justify-content: center;
}
}
 .menu-section , .mega-menu {
  display: none;
}



.checkout-form{
    width: 100%;
    padding: 7px;
    /* display: none; */
  }
.addressToggle{
  display: none;
  padding: 0 !important;
}
label[for="razorpay"]{
  font-size: 14px;
  
}







.form-group {
  margin-bottom: 10px;
 
}

.contact-section{
  /* display: block; */
}
.mobileBtnContact{
  display: block;
}
.delivery-section{
  /* display: none; */
  margin-top: 0;
}
.mobileBtnAddress{
  display: block;
  }

  .order-summary{
    /* display: block; */
    width: 100%;
    position: static;
    padding: 8px;
  }
  .two-col-name{
   gap:20px;
  //  flex-wrap: wrap;
  }

  label[for='pincode']{
  display:block;
  }

  
}

.suggestions {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top-width: 0;
    z-index: 2;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.suggestions li {
    padding: 10px;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #ddd;
}



.countrycodecheckout {
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    
}

.selectCountry{

width:100%;}








`}</style>
    </section>
  );
  
}

export default CheckOutForm
