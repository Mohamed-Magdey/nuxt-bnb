# nuxt-bnb

A fully functional AirBnb clone powered by Nuxt.js.

This project also integrate with third parties code from Google Apis, Algolia and Stripe
Deep dive into some of the most ignored problems your app will face in production and perform root-cause analysis to find out what's really going on behind the scenes

- Build REST API using NodeJS proxy for actions that require elevated privileges
- Property page where user can see property details
- Admin page for managing properties
- Algolia for data storage
- Stripe for payment
- Cloudinary to upload assets and optimize images for mobile friendly and stays efficient

## Project Config

To run this project in your local machine you need to setup your `.env` file and set the environment variables that uses in `nuxt.config.js` file.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
