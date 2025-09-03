package com.aggiovato.teamchecklist.checklist.web;

import com.aggiovato.teamchecklist.checklist.dto.ItemCreateDTO;
import com.aggiovato.teamchecklist.checklist.dto.ItemDTO;
import com.aggiovato.teamchecklist.checklist.dto.ItemUpdateDTO;
import com.aggiovato.teamchecklist.checklist.mapper.ItemMapper;
import com.aggiovato.teamchecklist.checklist.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checklists/{checklistId}/items")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService service;

    @GetMapping
    public List<ItemDTO> list(@PathVariable Long checklistId) {
        return service.listByCheclist(checklistId).stream().map(ItemMapper::toDTO).toList();
    }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public ItemDTO create(@PathVariable Long checklistId, @Valid @RequestBody ItemCreateDTO dto) {
        return ItemMapper.toDTO(service.create(checklistId, dto.text()));
    }

    @PatchMapping("/{itemId}")
    public ItemDTO update(@PathVariable Long checklistId, @PathVariable Long itemId, @Valid @RequestBody ItemUpdateDTO dto) {
        return ItemMapper.toDTO(service.update(itemId, dto.done(), dto.text(), dto.lastEditedBy()));
    }

    @DeleteMapping("/{itemId}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long checklistId, @PathVariable Long itemId) {
        service.delete(itemId);
    }
}
