"use client";

import { createUpdatedProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components/product';
import { Category, Product, Size } from "@/interfaces";
import { currencyFormatter } from '@/utils';
import { Gender } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Props {
  product: Partial<Product>;
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;

  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isLoading },
    getValues,
    setValue,
    watch } = useForm<FormInputs>({
      defaultValues: {
        ...product,
        tags: product.tags ? product.tags.join(', ') : '',
        sizes: product.sizes ?? [],
        images: undefined
      }
    })

  watch('sizes')
  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)

    setValue('sizes', Array.from(sizes))
  }
  const onSubmitForm = async (data: FormInputs) => {

    const formData = new FormData()
    const { images, ...productToSave } = data

    if (product.id) {
      formData.append('id', product.id)
    }
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, product: productDB } = await createUpdatedProduct(formData)

    if (!ok) {
      alert('No se pudo realizar el proceso')
      return
    }
    setValue('images', undefined)
    router.replace(`/admin/products/${productDB?.slug}`)
  }

  const onDeleteImage = async (imageId: number, imageUrl: string) => {
    const { ok, message } = await deleteProductImage(imageId, imageUrl)

    if (!ok) {
      alert(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="grid px-5 mb-16 grid-cols-1 lg:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option className='capitalize' key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <button
          type='submit'
          className={
            clsx(
              "w-full",
              {
                "btn-primary": !isLoading,
                "btn-disabled": isLoading
              }
            )
          }>
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })} />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                // bg-blue-500 text-white <--- si está seleccionado
                // flex items-center justify-center w-10 h-10 mr-2 border rounded-md
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={
                    clsx(
                      'p-2 cursor-pointer border rounded-md mr-2 mb-2 w-14 transition-all text-center',
                      {
                        "bg-blue-500 text-white": getValues('sizes').includes(size)
                      }
                    )
                  }>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />

          </div>


          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {
              product?.images?.map(img => (
                <div key={img.id}>
                  <ProductImage
                    src={img.url}
                    alt={`Imagen del producto ${product.title}`}
                    width={300}
                    height={300}
                    className='rounded-t shadow-md object-cover w-full'
                  />

                  <button
                    type='button'
                    className='bg-red-500 hover:bg-red-700 transition-all text-white text-center py-1 font-medium w-full rounded-b-md'
                    onClick={() => onDeleteImage(img.id, img.url)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};