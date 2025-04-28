/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data in the correct order
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@thaiheaven.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await hash('user123', 12)
  const user = await prisma.user.create({
    data: {
      email: 'user@thaiheaven.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create categories
  const tigerBalmCategory = await prisma.category.create({
    data: {
      name: 'Tiger Balm',
      description: 'World-famous Tiger Balm products for pain relief and muscle aches',
      image: '/images/category1tigerbalm.png',
    },
  })

  const coolingProductsCategory = await prisma.category.create({
    data: {
      name: 'Cooling Products',
      description: 'Refreshing cooling products for hot weather and muscle relief',
      image: '/images/category2coolingpowder.png',
    },
  })

  const inhalersCategory = await prisma.category.create({
    data: {
      name: 'Inhalers',
      description: 'Traditional Thai inhalers for respiratory relief',
      image: '/images/category3yadominhaler.png',
    },
  })

  // Create Tiger Balm products
  await prisma.product.create({
    data: {
      name: 'Tiger Balm Red',
      description: 'Classic Tiger Balm Red for muscle pain relief',
      price: 9.99,
      images: [
        '/images/en-tiger balm red.jpeg',
        '/images/en-tiger balm red2.jpeg',
        '/images/en-tiger balm red3.jpeg'
      ],
      categoryId: tigerBalmCategory.id,
      stock: 100,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Tiger Balm White',
      description: 'Tiger Balm White for mild muscle aches',
      price: 8.99,
      images: [
        '/images/en-tiger bal white.jpeg',
        '/images/en-tiger balm white2.jpeg',
        '/images/en-tiger balm white3.jpeg'
      ],
      categoryId: tigerBalmCategory.id,
      stock: 100,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Tiger Balm Plaster Red',
      description: 'Tiger Balm Red Plaster for targeted pain relief',
      price: 12.99,
      images: [
        '/images/en-tiger balm plaster red.jpeg',
        '/images/en-tiger balm red plaster 2.jpeg'
      ],
      categoryId: tigerBalmCategory.id,
      stock: 50,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Tiger Balm Green Plaster',
      description: 'Tiger Balm Green Plaster for muscle pain relief',
      price: 12.99,
      images: [
        '/images/en-th-tiger balm green plaster.jpeg',
        '/images/en&th-tiger balm green plaster.jpeg'
      ],
      categoryId: tigerBalmCategory.id,
      stock: 50,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Tiger Balm Mixed Plaster',
      description: 'Tiger Balm Mixed Plaster for various pain relief',
      price: 13.99,
      images: [
        '/images/en-mix-tiger balm plaster2.jpeg',
        '/images/en-mix-tiger balm plaster green and red.jpeg',
        '/images/en-mix-tiger balm red and white.jpeg'
      ],
      categoryId: tigerBalmCategory.id,
      stock: 50,
    },
  })

  // Create Cooling Products
  await prisma.product.create({
    data: {
      name: 'Cooling Powder',
      description: 'Traditional Thai cooling powder for hot weather relief',
      price: 7.99,
      images: [
        '/images/cooling powder.jpeg',
        '/images/cooling powder single.jpeg'
      ],
      categoryId: coolingProductsCategory.id,
      stock: 150,
    },
  })

  // Create Inhalers
  await prisma.product.create({
    data: {
      name: 'Yadom Inhaler',
      description: 'Traditional Thai herbal inhaler for respiratory relief',
      price: 6.99,
      images: [
        '/images/en-inhaler.jpeg',
        '/images/en-inhaler1.jpeg'
      ],
      categoryId: inhalersCategory.id,
      stock: 200,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Yadom Inhaler Thai',
      description: 'Thai version of the traditional herbal inhaler',
      price: 6.99,
      images: [
        '/images/th-inhaler.jpeg',
        '/images/th-inhaler2.jpeg',
        '/images/th-inhaler white 2.jpeg'
      ],
      categoryId: inhalersCategory.id,
      stock: 200,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Yadom Ingredients',
      description: 'Traditional Thai herbal ingredients for inhalers',
      price: 5.99,
      images: [
        '/images/en-yadom ingredients.jpeg',
        '/images/en-yadom-ingredients.jpeg'
      ],
      categoryId: inhalersCategory.id,
      stock: 100,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Yadom Collection',
      description: 'Complete collection of Yadom herbal products',
      price: 15.99,
      images: [
        '/images/th-yadom.jpeg',
        '/images/en-yadom1.jpeg',
        '/images/th-yadom3.jpeg',
        '/images/en-yadom3.jpeg',
        '/images/th-yadom2.jpeg'
      ],
      categoryId: inhalersCategory.id,
      stock: 75,
    },
  })

  console.log('Database has been seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
