nest g module user
nest g module bookmark
nest g module prisma

nest g controller prisma
nest g controller prisma --no-spec
nest g module prisma --no-spec
nest g service prisma
nest g service prisma --no-spec 		// no test file


yarn add @prisma/client
npx prisma init
npx prisma --help
npx prisma migrate dev
npx prisma generate

yarn add -D @types/passport-jwt
yarn add -D pactum


