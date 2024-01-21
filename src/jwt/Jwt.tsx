import axios from "axios";
const tokenString = localStorage.getItem('token');
const token = tokenString ? JSON.parse(tokenString) : null;

async function Jwt() {
  if (token) {
    try {
        const response = await axios.get("https://django.miantsebastien.com/api/user/", {
          headers: {'Authorization': `Bearer ${token.access}`}
        });
        response.data
        return token.access
    }
    catch (error) {
      try {
        const response = await axios.post("https://django.miantsebastien.com/api/token/refresh/", {
          refresh: token.refresh,
        });

        const data = { access: response.data.access, refresh: token.refresh };

        const dataString = JSON.stringify(data);

        localStorage.setItem('token', dataString);

        return data.access
      } catch (error) {
        return null
      }
    }
  }
  else {
     return null
  }
}

export default Jwt;
