package com.aggiovato.teamchecklist.checklist.mapper;

import com.aggiovato.teamchecklist.checklist.domain.Item;
import com.aggiovato.teamchecklist.checklist.dto.ItemDTO;

public class ItemMapper {

    public static ItemDTO toDTO(Item i){
        return new ItemDTO(i.getId(), i.getChecklist().getId(), i.getText(), i.isDone(), i.getLastEditedBy(), i.getUpdatedAt());
    }
}
