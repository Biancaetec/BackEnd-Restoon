import { z } from "zod";

// Esquema de banner com Zod
const BannersSchema = z.object({       
  imagem_uri: z.string().url(),               
  created_at: z.string().datetime(),          
});

const BannersController = {
  // Criar banner
  async createBanners(req, res) {
    try {
      const { imagem_uri, created_at} = req.body;
      BannersSchema.parse({  imagem_uri, created_at});

      // Simulando a criação de um banner
      res.status(201).json({ message: "Banners Criado com sucesso" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => ({
            atributo: err.path[0],
            mensagem: err.message,
          })),
        });12
      }
      res.status(500).send({ message: error.message });
    }
  },

  // Atualizar banner
  async updateBanners(req, res) {
    try {
      const { id } = req.params;
      const { imagem_uri, created_at} = req.body;

      // Simulando a atualização de um banner
      res.status(200).json({ message: `Banners ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default BannersController;
