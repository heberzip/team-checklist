package com.aggiovato.teamchecklist.checklist.mapper;

import com.aggiovato.teamchecklist.checklist.domain.Checklist;
import com.aggiovato.teamchecklist.checklist.dto.ChecklistDTO;

public class ChecklistMapper {

    public static ChecklistDTO toDTO(Checklist c){
        return new ChecklistDTO(c.getId(), c.getTitle(), c.getDescription(), c.getCreatedAt());
    }
}
