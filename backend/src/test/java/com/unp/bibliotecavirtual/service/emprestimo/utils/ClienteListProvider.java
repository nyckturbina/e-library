package com.unp.bibliotecavirtual.service.emprestimo.utils;

import com.unp.bibliotecavirtual.model.Cliente;

import java.util.List;

public class ClienteListProvider {
    private ClienteListProvider() {
    }

    public static List<Cliente> getClientes() {
        Cliente cliente1 = new Cliente("João Silva", "12345678901", "joao@email.com", "senha123");
        Cliente cliente2 = new Cliente("Maria Souza", "98765432101", "maria@email.com", "senha456");
        Cliente cliente3 = new Cliente("Carlos Oliveira", "45678912301", "carlos@email.com", "senha789");
        Cliente cliente4 = new Cliente("Ana Pereira", "32165498701", "ana@email.com", "senhaABC");
        Cliente cliente5 = new Cliente("Pedro Santos", "65412398701", "pedro@email.com", "senhaXYZ");
        Cliente cliente6 = new Cliente("Juliana Costa", "78945612301", "juliana@email.com", "senha456DEF");
        Cliente cliente7 = new Cliente("Lucas Fernandes", "15975346820", "lucas@email.com", "senhaGHI789");
        Cliente cliente8 = new Cliente("Amanda Rodrigues", "35795182460", "amanda@email.com", "senhaJKL123");
        Cliente cliente9 = new Cliente("Roberto Almeida", "85296374101", "roberto@email.com", "senhaMNO456");
        Cliente cliente10 = new Cliente("Fernanda Lima", "25814736901", "fernanda@email.com", "senhaPQR789");

        return List.of(
                cliente1,
                cliente2,
                cliente3,
                cliente4,
                cliente5,
                cliente6,
                cliente7,
                cliente8,
                cliente9,
                cliente10
        );
    }
}
