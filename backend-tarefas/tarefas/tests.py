from rest_framework import status
from rest_framework.test import APITestCase

from .models import Tarefa


class TarefaApiTests(APITestCase):
    lista_url = "/api/tarefas/"
    lixeira_url = "/api/tarefas/lixeira/"

    def test_cria_tarefa_e_lista_tarefas_ativas(self):
        criar = self.client.post(
            self.lista_url,
            {"texto": "Estudar", "concluida": False},
            format="json",
        )
        self.assertEqual(criar.status_code, status.HTTP_201_CREATED)
        self.assertEqual(criar.data["texto"], "Estudar")

        resposta = self.client.get(self.lista_url)
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resposta.data), 1)

    def test_rejeita_tarefa_sem_texto(self):
        resposta = self.client.post(self.lista_url, {"texto": ""}, format="json")
        self.assertEqual(resposta.status_code, status.HTTP_400_BAD_REQUEST)

    def test_conclui_move_para_lixeira_e_restaura_tarefa(self):
        tarefa = Tarefa.objects.create(texto="Ler")
        detalhe_url = f"{self.lista_url}{tarefa.id}/"

        concluir = self.client.patch(
            detalhe_url, {"concluida": True}, format="json"
        )
        self.assertEqual(concluir.status_code, status.HTTP_200_OK)
        self.assertTrue(concluir.data["concluida"])

        mover = self.client.patch(
            detalhe_url, {"na_lixeira": True}, format="json"
        )
        self.assertTrue(mover.data["na_lixeira"])
        self.assertEqual(self.client.get(self.lista_url).data, [])
        self.assertEqual(len(self.client.get(self.lixeira_url).data), 1)

        restaurar = self.client.patch(
            detalhe_url, {"na_lixeira": False}, format="json"
        )
        self.assertFalse(restaurar.data["na_lixeira"])
        self.assertEqual(len(self.client.get(self.lista_url).data), 1)

    def test_exclui_tarefa_permanentemente(self):
        tarefa = Tarefa.objects.create(texto="Apagar")
        resposta = self.client.delete(f"{self.lista_url}{tarefa.id}/")
        self.assertEqual(resposta.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Tarefa.objects.filter(pk=tarefa.id).exists())
