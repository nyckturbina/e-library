//package com.unp.bibliotecavirtual.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.unp.bibliotecavirtual.model.Cliente;
//import com.unp.bibliotecavirtual.model.Emprestimo;
//import com.unp.bibliotecavirtual.model.Livro;
//import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
//import com.unp.bibliotecavirtual.repository.ClienteRepository;
//import com.unp.bibliotecavirtual.repository.LivroRepository;
//
//@Service
//public class EmprestimoService {
//
//    @Autowired
//    private EmprestimoRepository emprestimoRepository;
//
//    @Autowired
//    private ClienteRepository clienteRepository;
//
//    @Autowired
//    private LivroRepository livroRepository;
//
//    public Emprestimo solicitarEmprestimo(Long idCliente, Long idLivro) {
//        Cliente cliente = clienteRepository.findById(idCliente)
//            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
//        Livro livro = livroRepository.findById(idLivro)
//            .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
//
//        Emprestimo emprestimo = new Emprestimo();
//        emprestimo.setAutorEmprestimo(cliente);
//        emprestimo.setLivroEmprestado(livro);
//        emprestimo.setDataEmprestimo(LocalDateTime.now());
//
//        return emprestimoRepository.save(emprestimo);
//    }
//
//    public List<Emprestimo> listarTodos() {
//        return emprestimoRepository.findAll();
//    }
//
//    public List<Emprestimo> buscarEmprestimosPorCliente(Long idCliente) {
//        return emprestimoRepository.findByAutorEmprestimoId(idCliente);
//    }
//
//    public void deletarEmprestimo(Long id) {
//        Optional<Emprestimo> existente = emprestimoRepository.findById(id);
//        if (existente.isPresent()) {
//            emprestimoRepository.delete(existente.get());
//        } else {
//            throw new RuntimeException("Empréstimo não encontrado para exclusão");
//        }
//    }
//}
