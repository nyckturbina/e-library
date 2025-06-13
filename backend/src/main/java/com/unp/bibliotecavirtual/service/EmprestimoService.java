package com.unp.bibliotecavirtual.service;

import com.unp.bibliotecavirtual.exceptions.ClienteNaoEncontrado;
import com.unp.bibliotecavirtual.exceptions.EmprestimoNotFoundException;
import com.unp.bibliotecavirtual.exceptions.LivroNaoDisponivelException;
import com.unp.bibliotecavirtual.exceptions.LivroNotFoundException;
import com.unp.bibliotecavirtual.model.Cliente;
import com.unp.bibliotecavirtual.model.Emprestimo;
import com.unp.bibliotecavirtual.model.Livro;
import com.unp.bibliotecavirtual.model.Multa;
import com.unp.bibliotecavirtual.repository.ClienteRepository;
import com.unp.bibliotecavirtual.repository.EmprestimoRepository;
import com.unp.bibliotecavirtual.repository.LivroRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.unp.bibliotecavirtual.model.enums.StatusEmprestimo.ATRASADO;
import static com.unp.bibliotecavirtual.model.enums.StatusEmprestimo.DEVOLVIDO;
import static com.unp.bibliotecavirtual.service.CalcularPrazoEmprestimo.calcularPrazo;
import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ClienteRepository clienteRepository;
    private @NonNull LocalDate dataDevolucaoReal;

    public Emprestimo registrarEmprestimo(Long livroId, Long clienteId) throws LivroNotFoundException, LivroNaoDisponivelException, ClienteNaoEncontrado {
        Livro livro = livroRepository.findById(livroId).orElseThrow(LivroNotFoundException::new);
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow(ClienteNaoEncontrado::new);

        if (livro.getExemplaresDisponiveisEmEstoque() <= 0) throw new LivroNaoDisponivelException();

        int prazo = calcularPrazo(livro);
        LocalDate dataDevolucao = LocalDate.now().plusDays(prazo);

        Emprestimo emprestimo = new Emprestimo(cliente, livro, LocalDate.now(), dataDevolucao);
        livro.setExemplaresDisponiveisEmEstoque(livro.getExemplaresDisponiveisEmEstoque() - 1);

        emprestimoRepository.save(emprestimo);
        livroRepository.save(livro);

        return emprestimo;
    }

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();
    }

    public List<Emprestimo> buscarEmprestimosPorCliente(Long idCliente) throws ClienteNaoEncontrado {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(ClienteNaoEncontrado::new);

        return emprestimoRepository.findByCliente(cliente);
    }

    public void deletarEmprestimo(Long id) throws EmprestimoNotFoundException {
        Emprestimo emprestimo = emprestimoRepository.findById(id).orElseThrow(EmprestimoNotFoundException::new);
        emprestimoRepository.delete(emprestimo);
    }

    public Emprestimo registrarDevolucao(Long emprestimoId) throws EmprestimoNotFoundException, LivroNotFoundException {
//         Empréstimo deve saber a data de devolução baseada no livro automaticamente
//         Multa deve saber se calcular sozinha, ao receber os dias de atraso
        LocalDate dataDevolucaoReal = LocalDate.now();

        Emprestimo emprestimo = emprestimoRepository
                .findById(emprestimoId)
                .orElseThrow(EmprestimoNotFoundException::new);

        // Livro deve ser uma entidade gerenciada
        Livro livro = livroRepository
                .findById(emprestimo.getLivro().getId())
                .orElseThrow(LivroNotFoundException::new);

        LocalDate dataDevolucaoPrevista = emprestimo.getPrazoDevolucao();

        double multa = 0;
        if (dataDevolucaoReal.isAfter(dataDevolucaoPrevista)) {
            long diasAtraso = DAYS.between(dataDevolucaoPrevista, dataDevolucaoReal);
            multa = diasAtraso * 2.0;
            emprestimo.setMulta(new Multa(multa));
            emprestimo.setStatus(ATRASADO);
        }

        livro.setExemplaresDisponiveisEmEstoque(livro.getExemplaresDisponiveisEmEstoque() + 1);
        livroRepository.save(livro);

        emprestimo.setPrazoDevolucao(dataDevolucaoReal);
        emprestimo.setStatus(DEVOLVIDO);
        emprestimoRepository.save(emprestimo);

        return emprestimo;
    }
}
