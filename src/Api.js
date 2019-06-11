const baseUrl = "http://localhost:49567/api";

class Api  {
    
    async getServiceTypes() {
	    let response = await fetch(baseUrl + '/service-types');
		let data = await response.json()
		return data;
    }

    async createAssistanceRequest(formData) {
	    let response = await fetch(baseUrl + '/assistance-requests', {
		    headers: { "Content-Type": "application/json; charset=utf-8" },
		    method: 'POST',
		    body: JSON.stringify({
		      "assistance_request": {
		        "contact": {
		          "first_name": formData.firstName,
		          "last_name": formData.lastName,
		          "email": formData.email
		        },
		        "service_type": formData.serviceType,
		        "description": formData.requestBody
		      }
		    })
		  });
		let data = await response.json();
		data.status = response.status;
	    return data;
    }

}

export default Api;