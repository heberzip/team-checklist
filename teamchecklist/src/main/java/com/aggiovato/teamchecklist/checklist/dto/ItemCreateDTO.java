package com.aggiovato.teamchecklist.checklist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ItemCreateDTO(
        @NotBlank @Size(max = 240) String text
) {}
