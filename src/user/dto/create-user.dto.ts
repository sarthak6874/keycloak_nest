export class CreateUserDto {
    "enabled": boolean;
    "username": string;
    "email": string;
    "firstName":string;
    "lastName": string;
    "credentials": [
        {
            "type": string,
            "value": string,
            "temporary":boolean
        }
    ];

   
 
}
