package com.unp.bibliotecavirtual.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Multa {

    private final double valorPorDia = 2.0;
    private double valorCalculado = 0.0;
}
