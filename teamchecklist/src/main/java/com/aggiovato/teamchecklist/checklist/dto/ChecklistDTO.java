package com.aggiovato.teamchecklist.checklist.dto;

import java.time.Instant;

public record ChecklistDTO(
        Long id,
        String title,
        String description,
        Instant createdAt
) {}
