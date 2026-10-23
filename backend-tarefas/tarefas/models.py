from django.db import models


class Tarefa(models.Model):
    texto = models.CharField(max_length=200)
    concluida = models.BooleanField(default=False)
    na_lixeira = models.BooleanField(default=False)
    
    def __str__(self):
        return self.texto
    