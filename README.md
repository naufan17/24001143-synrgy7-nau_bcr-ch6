# Car Management Dashboard
HTTP Rest API database cars

## Database schema
- Can access with this link: `https://dbdiagram.io/d/66441f509e85a46d55dfaa49`

## API Documentation
### 1. Get All Cars
- Method: `GET`
- URL Patterns: `{{base_url}}/api/car`
- Response:
  - Success: (200)
    ```json
    {
      "cars": [
        {  
          "id": uuid,
          "manufacture": string,
          "model": string,
          "image": string,
          "type": string,
          "year": number,
          "rent_price": number,
          "available": boolean,
          "created_at": Date,
          "updated_at": Date,
        },
      ]
    }
    ```
  - Errors: (404)
    ```json
    { 
      "message": "Car not found" 
    }
    ```    

### 2. Get Car By Id
- Method: `GET`
- URL Patterns: `{{base_url}}/api/car/{id}`
- Response:
  - Success: (200)
    ```json
    {  
      "id": uuid,
      "plate": string,
      "manufacture": string,
      "model": string,
      "image": string,
      "capacity": number,
      "description": text,
      "transmission": string,
      "type": string,
      "year": number,
      "rent_price": number,
      "available": boolean,
      "option": [ string ],
      "spec": [ string ],
      "created_at": Date,
      "updated_at": Date,
    },
    ```
  - Errors: (404)
    ```json
    { 
      "message": "Car not found" 
    }
    ```

### 3. Upload Image Car
- Method: `POST`
- URL Patterns: `{{base_url}}/api/cars`
- Headers:
  ``` json
    {
      "Content-Type": multipart/form-data
    }
  ```
- Body:
  ``` json
    {
      "image": image (type=file, max=2mb)
    }
  ```
- Response:
  - Success: (200)
    ```json
    {
      "url": String
    }
    ```
  - Errors: (500)
    ```json
    {
      "message": "Error uploading image"
    }
    ```

### 4. Create Car
- Method: `POST`
- URL Patterns: `{{base_url}}/api/car`
- Body:
    ```json
    {  
      "plate": string,
      "manufacture": string,
      "model": string,
      "image": string,
      "capacity": number,
      "description": text,
      "transmission": text,
      "type": text,
      "year": number,
      "rent_price": number,
      "options": [ string ],
      "specs": [ string ]
    }
    ```
- Response:
  - Success: (201)
    ```json
    { 
      "message": "Car created successfully" 
    }
    ```
  - Errors: (500)
    ```json
    { 
      "message": "Failed to create car" 
    }
    ```

### 5. Update Car
- Method: `PUT`
- URL Patterns: `{{base_url}}/api/car/{id}`
- Body:
  ```json
    {  
      "plate": string,
      "manufacture": string,
      "model": string,
      "image": string,
      "capacity": number,
      "description": text,
      "transmission": text,
      "type": text,
      "year": number,
      "rent_price": number,
      "options": [ string ],
      "specs": [ string ]
    }
    ```
- Response:
  - Success: (201)
    ```json
    { 
      "message": "Car updated successfully" 
    }
    ```
  - Errors: (500)
    ```json
    { 
      "message": "Failed to update car" 
    }
    ```

### 6. Delete Car
- Method: `DELETE`
- URL Patterns: `{{base_url}}/api/car/{id}`
- Response:
  - Success: (204)
    ```json
    { 
      "message": "Car deleted successfully" 
    }
    ```
  - Errors: (404)
    ```json
    { 
      "message": "Car not found" 
    }
    ```    

### 7. Get All Orders
- Method: `GET`
- URL Patterns: `{{base_url}}/api/order`
- Response:
  - Success: (200)
    ```json
    {
      "orders": [
        {  
          "id": uuid,
          "duration": number,
          "rent_start": Date,
          "rent_end": Date,
          "total_price": number,
          "status": string,
          "car": {
            "manufacture": string,
            "model": string,
            "type": string,
          },
          "customer": {
            "name": string,
            "email": string,
            "address": string,
          },
          "created_at": Date,
          "updated_at": Date,
        },
      ]
    }
    ```
  - Errors: (404)
    ```json
    { 
      "message": "Car not found" 
    }
    ```  

### 8. Create Order
- Method: `POST`
- URL Patterns: `{{base_url}}/api/order`
- Body:
    ```json
    {  
      "car_id": uuid,
      "name": string,
      "email": string,
      "address": string,
      "duration": number,
    }
    ```
- Response:
  - Success: (201)
    ```json
    { 
      "message": "Order created successfully" 
    }
    ```
  - Errors: (500)
    ```json
    { 
      "message": "Failed to create order" 
    }
    ```  

### 9. Delete Order
- Method: `DELETE`
- URL Patterns: `{{base_url}}/api/order/{id}`
- Response:
  - Success: (204)
    ```json
    { 
      "message": "Order deleted successfully"
    }
    ```
  - Errors: (404)
    ```json
    { 
      "message": "Order not found" 
    }
    ``` 