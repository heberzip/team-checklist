package com.aggiovato.teamchecklist.checklist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChecklistCreateDTO(
        @NotBlank @Size(max = 120) String title,
        @Size(max = 500) String description
) {}
