package com.aggiovato.teamchecklist.checklist.dto;

import java.time.Instant;

public record ItemDTO(
        Long id,
        Long checklistId,
        String text,
        boolean done,
        String lastEditedBy,
        Instant updatedAt
) {}
