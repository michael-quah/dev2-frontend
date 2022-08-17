import './App.css';
import { useEffect } from 'react';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { AdminPortal } from '@frontegg/react'

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
  loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  // admin user
  const handleClick = () => {
    AdminPortal.show();
  }

  const addNewUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    console.log(`Added NEW USER: ${user?.name} ${user?.email}`);

    // Populate this data from req object
    var raw = JSON.stringify({
      name: user?.name,
      email: user?.email,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  
    fetch("http://localhost:5000/customer/add", requestOptions)
      .then((response) => {
        response.text();
        console.log("Added new user successfully to database.");
      })
      .catch((error) => console.log("error", error));
  }

  const getAllOrders = () => {
    
    addNewUser();

    var requestOptions = {
      method: "GET",
    };

    fetch(`http://localhost:5000/customer/getorders?name=${user?.name}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        var text = `<table class="table-style"><thead><tr><th>Item Name</th><th>Quantity</th><th>Shipping Date</th></tr></thead>`;
        text += "<tbody>";
        data.forEach(function (item) {
          text += `<tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.shipping_date}</td>
          </tr>`;
        });
        text += "</tbody></table>";
        document.getElementById("mypanel").innerHTML = text;
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="App">
      { isAuthenticated ? (
        <div onLoad={() => getAllOrders()}>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <span>Email: {user?.email}</span>
          </div>
          <br />
          <hr />
          <div>
            <div className="group-buttons">
              <button className="button-style" onClick={() => alert(user.accessToken)}>What is my access token?</button>
            </div>
            <div>
              <button className="button-style" onClick={() => handleClick()}>Settings</button>
            </div>
            <div>
              <button className="button-style" onClick={() => logout()}>Click to logout</button>
            </div>
          </div>
          <hr />
          <div>
            <h3>
              Order Details
            </h3>
          </div>
          <div id="mypanel">
          </div>
        </div>
      ) : (
        <div onload={() => addNewUser()}>
          <div>
            <button onClick={() => loginWithRedirect()}>Click me to login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;