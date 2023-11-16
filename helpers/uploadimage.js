// Impoertaciones de cloudinary
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "db4d1c7ht",
  api_key: "425425898357517",
  api_secret: "MoaJq1cpP4QhTUHm4WVddIOxMD0",
});

export const uploadimage = async ({ photo }) => {
  // Primero obtenemos el path temporal de la imagen recibida, asegurate de escibir el tempFilePath
  const { tempFilePath } = photo;
  // de lo que retorna cloudinary, desestructuranos el secure_url
  // pero le pasamos el la ruta del archivo temporal
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  // Hacemos una variable con el nombre que queremos (image_profile) con el valor de secure_url
  const image_profile = secure_url;

  return image_profile;
};

export const deleteImage = async ({ image }) => {
  if (!image) return;
  // El split separa la url, con el /, y entonces devuelve un array
  const imageCloudinary = image.split("/");
  // Buscamos el nombre de la imagen, como es el ultimo elemento del array
  // entonces obtenemos el ultimo elemnto del array
  const nameImage = imageCloudinary[imageCloudinary.length - 1];
  // Obtenemos el id de la imagem
  const [id] = nameImage.split(".");
  // Ejemplo de una url https://res.cloudinary.com/db4d1c7ht/image/upload/v1697951703/gzbl2hy4shghslga5r7n.jpg

  // Este seria un id de cloudinary gzbl2hy4shghslga5r7n.jpg

  await cloudinary.uploader.destroy(id);
};
