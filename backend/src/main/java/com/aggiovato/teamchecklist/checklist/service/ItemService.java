package com.aggiovato.teamchecklist.checklist.service;

import com.aggiovato.teamchecklist.checklist.domain.Item;
import com.aggiovato.teamchecklist.checklist.repo.ItemRepository;
import com.aggiovato.teamchecklist.common.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository item_repo;
    private final ChecklistService checklist_service;

    // CREATE ITEM BY CHECKLIST RELATED
    @Transactional
    public Item create(Long checklist_id, String text){
        var cl = checklist_service.get(checklist_id);
        var it = new Item();

        it.setChecklist(cl);
        it.setText(text);

        return item_repo.save(it);
    }

    // GET BY CHECKLIST ID RELATED
    @Transactional(readOnly = true)
    public List<Item> listByCheclist(Long checklist_id){
        return item_repo.findByChecklistId(checklist_id);
    }

    // UPDATE ITEM
    @Transactional
    public Item update(Long item_id, Boolean done, String text, String user){
        var it = item_repo.findById(item_id).orElseThrow(() -> new NotFoundException("Item"));

        if(done != null) it.setDone(done);
        if(text != null) it.setText(text);
        if(user != null) it.setLastEditedBy(user);

        return item_repo.save(it);
    }

    // DELETE ITEM
    @Transactional
    public void delete(Long item_id){ item_repo.deleteById(item_id); }
}
