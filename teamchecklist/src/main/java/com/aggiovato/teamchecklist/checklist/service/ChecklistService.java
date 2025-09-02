package com.aggiovato.teamchecklist.checklist.service;

import com.aggiovato.teamchecklist.checklist.domain.Checklist;
import com.aggiovato.teamchecklist.checklist.repo.ChecklistRepository;
import com.aggiovato.teamchecklist.common.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChecklistService {
    private final ChecklistRepository repo;

    // CREATE CHECKLIST
    @Transactional
    public Checklist create(String title, String description) {
        var c = new Checklist();

        c.setTitle(title);
        c.setDescription(description);

        return repo.save(c);
    }

    // GET LIST OF CHECKLISTS
    @Transactional(readOnly = true)
    public List<Checklist> list() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // GET CHECKLIST BY ID
    @Transactional(readOnly = true)
    public Checklist get(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Checklist"));
    }

    // DELETE CHECKLIST BY ID
    @Transactional
    public void delete(Long id) { repo.deleteById(id);}

}
