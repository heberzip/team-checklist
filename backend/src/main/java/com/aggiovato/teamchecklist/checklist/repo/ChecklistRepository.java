package com.aggiovato.teamchecklist.checklist.repo;

import com.aggiovato.teamchecklist.checklist.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<Checklist,Long> {
}
