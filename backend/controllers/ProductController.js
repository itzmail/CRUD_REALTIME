import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProduct = async (req, res) => {
  try {
    const response = await prisma.product.findMany();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
      error,
    });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Product Not Found",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const added = await prisma.product.create({
      data: { name, price },
    });

    res.status(201).json({
      status: "success",
      message: "Berhasil daftar Product",
      data: added,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error create product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: name,
        price: price,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Berhasil update Product",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error create product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await prisma.product.delete({
            where: {id: parseInt(req.params.id)}
        });
        res.status(200).json({
            status: 'success',
            message: `Berhasil Menghapus product ${deleted.name}`,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'gagal menghapus product',
            error: error
        })
    }
};
