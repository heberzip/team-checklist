package com.aggiovato.teamchecklist.checklist.web;

import com.aggiovato.teamchecklist.checklist.dto.ChecklistCreateDTO;
import com.aggiovato.teamchecklist.checklist.dto.ChecklistDTO;
import com.aggiovato.teamchecklist.checklist.mapper.ChecklistMapper;
import com.aggiovato.teamchecklist.checklist.service.ChecklistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checklists")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChecklistController {
    private final ChecklistService service;

    @GetMapping
    public ResponseEntity<?> list(){
        var resp = service.list().stream().map(ChecklistMapper::toDTO).toList();
        if(resp.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "no checklists found"));
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/new") @ResponseStatus(HttpStatus.CREATED)
    public ChecklistDTO create(@Valid @RequestBody ChecklistCreateDTO dto){
        return ChecklistMapper.toDTO(service.create(dto.title(), dto.description()));
    }

    @GetMapping("/{id}")
    public ChecklistDTO get(@PathVariable Long id) {
        return ChecklistMapper.toDTO(service.get(id));
    }

    @DeleteMapping("/delete/{id}") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
