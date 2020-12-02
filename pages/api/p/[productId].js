export default async function pdp(req, res) {
  const { productId } = req.query
  const resultResponse = await fetch(`https://fakestoreapi.com/products/${productId}`)
  const rawResult = await resultResponse.json()
  const formattedResult = {
    pageData: {
      title: rawResult.title, // the document title
      product: {
        // info for the product.  You can add to this as needed.
        id: rawResult.id, // the product id
        url: `/p/${rawResult.id}`, // the URL for the product page
        name: rawResult.title, // the name of the product
        price: Number(rawResult.price), // the price as a number
        priceText: `$${rawResult.price}`, // the price as formatted text with currency
        rating: Math.random() * (5 - 1) + 1, // the product rating
        description: rawResult.description, // the product description
        specs: 'none', // the product specs - this is just a suggestion.  Feel free to add any additional fields needed for the UI.
        media: {
          // images and videos for the MediaCarousel component
          full: [
            {
              // an array of full size images
              src: rawResult.image, // the URL of the full size image
              alt: `Product with id ${rawResult.id}`, // alt text for the full size image
              type: 'image', // "image" or "video" - by default entries will be treated as images
              magnify: {
                // optional - provides a high-res image for manigfication on hover in desktop browsers
                height: 1200, // the height of the high-res image
                width: 1200, // the width of the high-res image
                src: rawResult.image // the URL of the high res image
              },
            },
          ],
          thumbnails: [
            {
              // an array of thumbnails to display below the main image carousel
              src: rawResult.image, // the thumbnail URL
              alt: `Product Thumbnail ${rawResult.id}`, // alt text for the thumbnail
            },
          ],
        },
        sizes: [],
        colors: [],
      },
    },
  }

  return res.json(formattedResult)
}
