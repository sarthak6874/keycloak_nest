import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import axios from 'axios';

let headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const data = {
  grant_type: 'client_credentials',
  client_id: 'nest-client',
  client_secret: '0sDuSogJXsHQldNAoM9oqF5Zof06bM9y',
};

let acceessToken = '';

axios
  .post(
    'http://localhost:8080/realms/nest/protocol/openid-connect/token',
    data,
    { headers },
  )
  .then((response) => {
    acceessToken = response.data.access_token;
    // acceessToken = access_token;
    console.log('acceessToken-=11-=-=>', acceessToken !== null);
  })
  .catch((error) => {
    console.error(error);
  });

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  @Post()
  //  create(@Body() adduser: any) {
  //    const headers = {
  //      'Content-Type': 'application/json',
  //      Authorization: `Bearer ${acceessToken}`,
  //    };
  //    const url = 'http://localhost:8080/admin/realms/nest/users';
  //    axios.post(url, JSON.stringify(adduser), { headers });
  //  }
  //  @Post()
  //     getToken(@Body() request :any)
  //     let  credentials = {
  //          client_id: 'nest-client',
  //          client_secret: '0sDuSogJXsHQldNAoM9oqF5Zof06bM9y',
  //          "username": request.username,
  //  		    "password": request.password,
  //   		    "grant_type": "password"
  //        };
  //      console.log(credentials);
  //      const url = 'http://localhost:8080/realms/nest/protocol/openid-connect/token';
  //      axios.post(url, JSON.stringify(credentials) ).then((response) => {
  //        return response.data.access_token;
  //      });
  //      }

  //   @Get()
  //   async show() {
  //     const headers = {
  //       Authorization: `Bearer ${acceessToken}`,
  //       //'Content-Type': 'application/json'
  //     };
  //     const url = 'http://localhost:8080/admin/realms/nest/users';
  //     const response=await axios.get(url, { headers });
  //     return (response.data);
  //   }

    @Get('/roles')
    async roles() {
      const headers = {
        Authorization: `Bearer ${acceessToken}`,
        //'Content-Type': 'application/json'
      };
      const url = 'http://localhost:8080/admin/realms/nest/roles';
      const response=await axios.get(url, { headers });
      return (response.data);
    }

  @Delete('/rolemapping/:id')
  role_mapping(@Param('id')id:string,@Body() roles: any) {
    //const id = '0eaa1e76-31e6-41ea-9fbb-a39fbb551d6f';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${acceessToken}`,
    };
    console.log('id-=-=>', id);
    console.log('headers-=-=>', headers);
    const url = `http://localhost:8080/admin/realms/nest/users/${id}/role-mappings/realm`;

    axios
      .post(url, JSON.stringify(roles), { headers })
      // .then((response) => {
      //   acceessToken = response.data.access_token;
      //   // acceessToken = access_token;
      //   console.log('acceessToken-=11-=-=>', acceessToken !== null);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
  }
}

//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.userService.findOne(+id);
//   // }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   //   return this.userService.update(+id, updateUserDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.userService.remove(+id);
