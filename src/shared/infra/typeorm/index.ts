import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1702173444374 } from './migrations/1702173444374-CreateProducts';
import { CreateUsers1702867873012 } from './migrations/1702867873012-CreateUsers';
import { CreateUserTokens1704235586431 } from './migrations/1704235586431-CreateUserTokens';
import { CreateCustomers1704762439496 } from './migrations/1704762439496-CreateCustomers';
import { CreateOrders1705025657054 } from './migrations/1705025657054-CreateOrders';
import { AddCustomerIdToOrders1705025802541 } from './migrations/1705025802541-AddCustomerIdToOrders';
import { CreateOrdersProducts1705026247945 } from './migrations/1705026247945-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1705026441019 } from './migrations/1705026441019-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1705026614269 } from './migrations/1705026614269-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1702173444374,
    CreateUsers1702867873012,
    CreateUserTokens1704235586431,
    CreateCustomers1704762439496,
    CreateOrders1705025657054,
    AddCustomerIdToOrders1705025802541,
    CreateOrdersProducts1705026247945,
    AddOrderIdToOrdersProducts1705026441019,
    AddProductIdToOrdersProducts1705026614269,
  ],
});
