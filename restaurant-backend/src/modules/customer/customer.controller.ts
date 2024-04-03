import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  async saveCustomer(@Body() customer: CreateCustomerDto) {
    return this.customerService.saveCustomer(customer);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() customer: CreateCustomerDto,
  ) {
    return this.customerService.updateDustomer(id, customer);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
