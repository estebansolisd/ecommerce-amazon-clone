import { productSuggestions } from 'react-storefront-connector'
import { pdp } from '../[productId]'

export default async function(req, res) {
  //Getting product
  const formattedProduct = await pdp(req, res)

  const resultResponse = await fetch('https://fakestoreapi.com/products')
  const rawResults = await resultResponse.json()
  const rawSuggestedProducts = rawResults.filter(rawResult =>
    rawResult.title.toLowerCase().trim().includes(formattedProduct.title.toLowerCase().trim())
  );
  const mapOfSuggestedProds = rawSuggestedProducts.map(rsp => ({
    pageData: {
      title: rsp.title, // the document title
      product: {
        // info for the product.  You can add to this as needed.
        id: rsp.id, // the product id
        url: `/p/${rsp.id}`, // the URL for the product page
        name: rsp.title, // the name of the product
        price: Number(rsp.price), // the price as a number
        priceText: `$${rsp.price}`, // the price as formatted text with currency
        rating: Math.random() * (5 - 1) + 1, // the product rating
        description: rsp.description, // the product description
        specs: null, // the product specs - this is just a suggestion.  Feel free to add any additional fields needed for the UI.
        media: {
          // images and videos for the MediaCarousel component
          full: [
            {
              // an array of full size images
              src: rsp.image, // the URL of the full size image
              alt: `Product with id ${rsp.id}`, // alt text for the full size image
              type: 'image', // "image" or "video" - by default entries will be treated as images
              magnify: {
                // optional - provides a high-res image for manigfication on hover in desktop browsers
                height: 1200, // the height of the high-res image
                width: 1200, // the width of the high-res image
                src: rsp.image // the URL of the high res image
              },
            },
          ],
          thumbnails: [
            {
              // an array of thumbnails to display below the main image carousel
              src: rsp.image, // the thumbnail URL
              alt: `Product Thumbnail ${rsp.id}`, // alt text for the thumbnail
            },
          ],
        },
        sizes: [],
        colors: [],
      },
    },
  }));

  return res.json(mapOfSuggestedProds)
}
