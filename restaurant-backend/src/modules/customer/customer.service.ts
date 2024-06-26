import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCustomers() {
    return this.prisma.customer.findMany({
      include: {
        orders: {
          select: {
            date: true,
            totalAmount: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
  }

  async getCustomerById(id: number) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async saveCustomer(customer: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: customer,
    });
  }

  async updateDustomer(id: number, customer: CreateCustomerDto) {
    return this.prisma.customer.update({
      where: {
        id: id,
      },
      data: customer,
    });
  }

  async deleteCustomer(id: number) {
    return this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }

  async getCustomerByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: {
        email: email,
      },
    });
  }
}
