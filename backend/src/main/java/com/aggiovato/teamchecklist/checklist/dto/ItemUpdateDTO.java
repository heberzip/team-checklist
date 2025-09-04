package com.aggiovato.teamchecklist.checklist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ItemUpdateDTO(
        boolean done,
        @Size(max = 240) String text,
        @Size(max = 60) String lastEditedBy
) {}
