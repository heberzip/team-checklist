package com.aggiovato.teamchecklist.checklist.repo;

import com.aggiovato.teamchecklist.checklist.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Long> {
    List<Item> findByChecklistId(Long checklistId);
}
