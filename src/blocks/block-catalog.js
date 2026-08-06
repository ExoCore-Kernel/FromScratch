// Exactly 300 data-driven OS-development blocks: 20 categories × 15 blocks.
// These definitions are shared by the Blockly UI, C generator, and server runtime stubs.
export const extensionCategories = [
  {
    "name": "Kernel services",
    "colour": 275,
    "blocks": [
      {
        "type": "osx_kernel_services_request_system_shutdown",
        "cName": "blockos_ext_kernel_services_request_system_shutdown",
        "label": "request system shutdown",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_kernel_services_request_system_restart",
        "cName": "blockos_ext_kernel_services_request_system_restart",
        "label": "request system restart",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_kernel_services_set_kernel_status_code",
        "cName": "blockos_ext_kernel_services_set_kernel_status_code",
        "label": "set kernel status code",
        "kind": "cmd",
        "args": [
          {
            "name": "code",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_services_get_kernel_status_code",
        "cName": "blockos_ext_kernel_services_get_kernel_status_code",
        "label": "get kernel status code",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_kernel_services_set_boot_stage",
        "cName": "blockos_ext_kernel_services_set_boot_stage",
        "label": "set boot stage",
        "kind": "cmd",
        "args": [
          {
            "name": "stage",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_services_get_boot_stage",
        "cName": "blockos_ext_kernel_services_get_boot_stage",
        "label": "get boot stage",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_kernel_services_register_panic_message",
        "cName": "blockos_ext_kernel_services_register_panic_message",
        "label": "register panic message",
        "kind": "cmd",
        "args": [
          {
            "name": "message",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_kernel_services_trigger_kernel_panic",
        "cName": "blockos_ext_kernel_services_trigger_kernel_panic",
        "label": "trigger kernel panic",
        "kind": "cmd",
        "args": [
          {
            "name": "message",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_kernel_services_safe_mode_enabled",
        "cName": "blockos_ext_kernel_services_safe_mode_enabled",
        "label": "safe mode enabled",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_kernel_services_set_safe_mode",
        "cName": "blockos_ext_kernel_services_set_safe_mode",
        "label": "set safe mode",
        "kind": "cmd",
        "args": [
          {
            "name": "enabled",
            "type": "Boolean"
          }
        ]
      },
      {
        "type": "osx_kernel_services_get_bootloader_name",
        "cName": "blockos_ext_kernel_services_get_bootloader_name",
        "label": "get bootloader name",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_kernel_services_get_boot_command_line",
        "cName": "blockos_ext_kernel_services_get_boot_command_line",
        "label": "get boot command line",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_kernel_services_get_kernel_uptime_ticks",
        "cName": "blockos_ext_kernel_services_get_kernel_uptime_ticks",
        "label": "get kernel uptime ticks",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_kernel_services_set_system_hostname",
        "cName": "blockos_ext_kernel_services_set_system_hostname",
        "label": "set system hostname",
        "kind": "cmd",
        "args": [
          {
            "name": "hostname",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_kernel_services_get_system_hostname",
        "cName": "blockos_ext_kernel_services_get_system_hostname",
        "label": "get system hostname",
        "kind": "text",
        "args": []
      }
    ]
  },
  {
    "name": "CPU",
    "colour": 15,
    "blocks": [
      {
        "type": "osx_cpu_get_cpu_vendor",
        "cName": "blockos_ext_cpu_get_cpu_vendor",
        "label": "get CPU vendor",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_cpu_get_cpu_brand",
        "cName": "blockos_ext_cpu_get_cpu_brand",
        "label": "get CPU brand",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_cpu_get_logical_processor_count",
        "cName": "blockos_ext_cpu_get_logical_processor_count",
        "label": "get logical processor count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_cpu_get_current_cpu_number",
        "cName": "blockos_ext_cpu_get_current_cpu_number",
        "label": "get current CPU number",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_cpu_get_cpu_frequency_khz",
        "cName": "blockos_ext_cpu_get_cpu_frequency_khz",
        "label": "get CPU frequency kHz",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_cpu_read_timestamp_counter",
        "cName": "blockos_ext_cpu_read_timestamp_counter",
        "label": "read timestamp counter",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_cpu_enable_cpu_interrupts",
        "cName": "blockos_ext_cpu_enable_cpu_interrupts",
        "label": "enable CPU interrupts",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_cpu_disable_cpu_interrupts",
        "cName": "blockos_ext_cpu_disable_cpu_interrupts",
        "label": "disable CPU interrupts",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_cpu_cpu_interrupts_enabled",
        "cName": "blockos_ext_cpu_cpu_interrupts_enabled",
        "label": "CPU interrupts enabled",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_cpu_pause_cpu_briefly",
        "cName": "blockos_ext_cpu_pause_cpu_briefly",
        "label": "pause CPU briefly",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_cpu_invalidate_cpu_cache",
        "cName": "blockos_ext_cpu_invalidate_cpu_cache",
        "label": "invalidate CPU cache",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_cpu_flush_cache_line",
        "cName": "blockos_ext_cpu_flush_cache_line",
        "label": "flush cache line",
        "kind": "cmd",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_cpu_read_control_register",
        "cName": "blockos_ext_cpu_read_control_register",
        "label": "read control register",
        "kind": "num",
        "args": [
          {
            "name": "register",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_cpu_write_control_register",
        "cName": "blockos_ext_cpu_write_control_register",
        "label": "write control register",
        "kind": "cmd",
        "args": [
          {
            "name": "register",
            "type": "Number"
          },
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_cpu_execute_cpu_memory_fence",
        "cName": "blockos_ext_cpu_execute_cpu_memory_fence",
        "label": "execute CPU memory fence",
        "kind": "cmd",
        "args": []
      }
    ]
  },
  {
    "name": "Interrupts",
    "colour": 5,
    "blocks": [
      {
        "type": "osx_interrupts_install_interrupt_table",
        "cName": "blockos_ext_interrupts_install_interrupt_table",
        "label": "install interrupt table",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_interrupts_register_interrupt_handler",
        "cName": "blockos_ext_interrupts_register_interrupt_handler",
        "label": "register interrupt handler",
        "kind": "cmd",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          },
          {
            "name": "handler address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_unregister_interrupt_handler",
        "cName": "blockos_ext_interrupts_unregister_interrupt_handler",
        "label": "unregister interrupt handler",
        "kind": "cmd",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_mask_hardware_irq",
        "cName": "blockos_ext_interrupts_mask_hardware_irq",
        "label": "mask hardware IRQ",
        "kind": "cmd",
        "args": [
          {
            "name": "irq",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_unmask_hardware_irq",
        "cName": "blockos_ext_interrupts_unmask_hardware_irq",
        "label": "unmask hardware IRQ",
        "kind": "cmd",
        "args": [
          {
            "name": "irq",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_hardware_irq_is_masked",
        "cName": "blockos_ext_interrupts_hardware_irq_is_masked",
        "label": "hardware IRQ is masked",
        "kind": "bool",
        "args": [
          {
            "name": "irq",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_send_end_of_interrupt",
        "cName": "blockos_ext_interrupts_send_end_of_interrupt",
        "label": "send end of interrupt",
        "kind": "cmd",
        "args": [
          {
            "name": "irq",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_get_last_interrupt_vector",
        "cName": "blockos_ext_interrupts_get_last_interrupt_vector",
        "label": "get last interrupt vector",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_interrupts_set_interrupt_priority",
        "cName": "blockos_ext_interrupts_set_interrupt_priority",
        "label": "set interrupt priority",
        "kind": "cmd",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          },
          {
            "name": "priority",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_allocate_interrupt_vector",
        "cName": "blockos_ext_interrupts_allocate_interrupt_vector",
        "label": "allocate interrupt vector",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_interrupts_release_interrupt_vector",
        "cName": "blockos_ext_interrupts_release_interrupt_vector",
        "label": "release interrupt vector",
        "kind": "cmd",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_trigger_software_interrupt",
        "cName": "blockos_ext_interrupts_trigger_software_interrupt",
        "label": "trigger software interrupt",
        "kind": "cmd",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_interrupts_enable_non_maskable_interrupts",
        "cName": "blockos_ext_interrupts_enable_non_maskable_interrupts",
        "label": "enable non-maskable interrupts",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_interrupts_disable_non_maskable_interrupts",
        "cName": "blockos_ext_interrupts_disable_non_maskable_interrupts",
        "label": "disable non-maskable interrupts",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_interrupts_get_interrupt_count",
        "cName": "blockos_ext_interrupts_get_interrupt_count",
        "label": "get interrupt count",
        "kind": "num",
        "args": [
          {
            "name": "vector",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Physical memory",
    "colour": 25,
    "blocks": [
      {
        "type": "osx_physical_memory_get_total_physical_memory_bytes",
        "cName": "blockos_ext_physical_memory_get_total_physical_memory_bytes",
        "label": "get total physical memory bytes",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_physical_memory_get_free_physical_memory_bytes",
        "cName": "blockos_ext_physical_memory_get_free_physical_memory_bytes",
        "label": "get free physical memory bytes",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_physical_memory_allocate_physical_page",
        "cName": "blockos_ext_physical_memory_allocate_physical_page",
        "label": "allocate physical page",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_physical_memory_free_physical_page",
        "cName": "blockos_ext_physical_memory_free_physical_page",
        "label": "free physical page",
        "kind": "cmd",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_allocate_contiguous_physical_pages",
        "cName": "blockos_ext_physical_memory_allocate_contiguous_physical_pages",
        "label": "allocate contiguous physical pages",
        "kind": "num",
        "args": [
          {
            "name": "page count",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_reserve_physical_range",
        "cName": "blockos_ext_physical_memory_reserve_physical_range",
        "label": "reserve physical range",
        "kind": "cmd",
        "args": [
          {
            "name": "start",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_release_physical_range",
        "cName": "blockos_ext_physical_memory_release_physical_range",
        "label": "release physical range",
        "kind": "cmd",
        "args": [
          {
            "name": "start",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_physical_page_is_allocated",
        "cName": "blockos_ext_physical_memory_physical_page_is_allocated",
        "label": "physical page is allocated",
        "kind": "bool",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_zero_physical_page",
        "cName": "blockos_ext_physical_memory_zero_physical_page",
        "label": "zero physical page",
        "kind": "cmd",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_copy_physical_page",
        "cName": "blockos_ext_physical_memory_copy_physical_page",
        "label": "copy physical page",
        "kind": "cmd",
        "args": [
          {
            "name": "destination",
            "type": "Number"
          },
          {
            "name": "source",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_get_physical_page_size",
        "cName": "blockos_ext_physical_memory_get_physical_page_size",
        "label": "get physical page size",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_physical_memory_get_memory_map_entry_count",
        "cName": "blockos_ext_physical_memory_get_memory_map_entry_count",
        "label": "get memory map entry count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_physical_memory_get_memory_map_entry_start",
        "cName": "blockos_ext_physical_memory_get_memory_map_entry_start",
        "label": "get memory map entry start",
        "kind": "num",
        "args": [
          {
            "name": "index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_get_memory_map_entry_length",
        "cName": "blockos_ext_physical_memory_get_memory_map_entry_length",
        "label": "get memory map entry length",
        "kind": "num",
        "args": [
          {
            "name": "index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_physical_memory_get_memory_map_entry_type",
        "cName": "blockos_ext_physical_memory_get_memory_map_entry_type",
        "label": "get memory map entry type",
        "kind": "num",
        "args": [
          {
            "name": "index",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Virtual memory",
    "colour": 35,
    "blocks": [
      {
        "type": "osx_virtual_memory_create_address_space",
        "cName": "blockos_ext_virtual_memory_create_address_space",
        "label": "create address space",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_virtual_memory_destroy_address_space",
        "cName": "blockos_ext_virtual_memory_destroy_address_space",
        "label": "destroy address space",
        "kind": "cmd",
        "args": [
          {
            "name": "address space",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_switch_address_space",
        "cName": "blockos_ext_virtual_memory_switch_address_space",
        "label": "switch address space",
        "kind": "cmd",
        "args": [
          {
            "name": "address space",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_map_virtual_page",
        "cName": "blockos_ext_virtual_memory_map_virtual_page",
        "label": "map virtual page",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          },
          {
            "name": "physical",
            "type": "Number"
          },
          {
            "name": "flags",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_unmap_virtual_page",
        "cName": "blockos_ext_virtual_memory_unmap_virtual_page",
        "label": "unmap virtual page",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_translate_virtual_address",
        "cName": "blockos_ext_virtual_memory_translate_virtual_address",
        "label": "translate virtual address",
        "kind": "num",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_virtual_page_is_mapped",
        "cName": "blockos_ext_virtual_memory_virtual_page_is_mapped",
        "label": "virtual page is mapped",
        "kind": "bool",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_set_virtual_page_flags",
        "cName": "blockos_ext_virtual_memory_set_virtual_page_flags",
        "label": "set virtual page flags",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          },
          {
            "name": "flags",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_get_virtual_page_flags",
        "cName": "blockos_ext_virtual_memory_get_virtual_page_flags",
        "label": "get virtual page flags",
        "kind": "num",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_flush_tlb_page",
        "cName": "blockos_ext_virtual_memory_flush_tlb_page",
        "label": "flush TLB page",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_flush_entire_tlb",
        "cName": "blockos_ext_virtual_memory_flush_entire_tlb",
        "label": "flush entire TLB",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_virtual_memory_map_virtual_range",
        "cName": "blockos_ext_virtual_memory_map_virtual_range",
        "label": "map virtual range",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          },
          {
            "name": "physical",
            "type": "Number"
          },
          {
            "name": "pages",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_unmap_virtual_range",
        "cName": "blockos_ext_virtual_memory_unmap_virtual_range",
        "label": "unmap virtual range",
        "kind": "cmd",
        "args": [
          {
            "name": "virtual",
            "type": "Number"
          },
          {
            "name": "pages",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_clone_address_space",
        "cName": "blockos_ext_virtual_memory_clone_address_space",
        "label": "clone address space",
        "kind": "num",
        "args": [
          {
            "name": "source",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_virtual_memory_get_current_address_space",
        "cName": "blockos_ext_virtual_memory_get_current_address_space",
        "label": "get current address space",
        "kind": "num",
        "args": []
      }
    ]
  },
  {
    "name": "Kernel heap",
    "colour": 45,
    "blocks": [
      {
        "type": "osx_kernel_heap_initialize_kernel_heap",
        "cName": "blockos_ext_kernel_heap_initialize_kernel_heap",
        "label": "initialize kernel heap",
        "kind": "cmd",
        "args": [
          {
            "name": "start",
            "type": "Number"
          },
          {
            "name": "size",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_allocate_heap_bytes",
        "cName": "blockos_ext_kernel_heap_allocate_heap_bytes",
        "label": "allocate heap bytes",
        "kind": "num",
        "args": [
          {
            "name": "size",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_allocate_zeroed_items",
        "cName": "blockos_ext_kernel_heap_allocate_zeroed_items",
        "label": "allocate zeroed items",
        "kind": "num",
        "args": [
          {
            "name": "count",
            "type": "Number"
          },
          {
            "name": "item size",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_resize_heap_allocation",
        "cName": "blockos_ext_kernel_heap_resize_heap_allocation",
        "label": "resize heap allocation",
        "kind": "num",
        "args": [
          {
            "name": "address",
            "type": "Number"
          },
          {
            "name": "new size",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_free_heap_allocation",
        "cName": "blockos_ext_kernel_heap_free_heap_allocation",
        "label": "free heap allocation",
        "kind": "cmd",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_get_allocation_size",
        "cName": "blockos_ext_kernel_heap_get_allocation_size",
        "label": "get allocation size",
        "kind": "num",
        "args": [
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_get_heap_bytes_used",
        "cName": "blockos_ext_kernel_heap_get_heap_bytes_used",
        "label": "get heap bytes used",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_kernel_heap_get_heap_bytes_free",
        "cName": "blockos_ext_kernel_heap_get_heap_bytes_free",
        "label": "get heap bytes free",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_kernel_heap_validate_kernel_heap",
        "cName": "blockos_ext_kernel_heap_validate_kernel_heap",
        "label": "validate kernel heap",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_kernel_heap_dump_kernel_heap",
        "cName": "blockos_ext_kernel_heap_dump_kernel_heap",
        "label": "dump kernel heap",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_kernel_heap_create_memory_pool",
        "cName": "blockos_ext_kernel_heap_create_memory_pool",
        "label": "create memory pool",
        "kind": "num",
        "args": [
          {
            "name": "item size",
            "type": "Number"
          },
          {
            "name": "item count",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_destroy_memory_pool",
        "cName": "blockos_ext_kernel_heap_destroy_memory_pool",
        "label": "destroy memory pool",
        "kind": "cmd",
        "args": [
          {
            "name": "pool",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_allocate_from_memory_pool",
        "cName": "blockos_ext_kernel_heap_allocate_from_memory_pool",
        "label": "allocate from memory pool",
        "kind": "num",
        "args": [
          {
            "name": "pool",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_free_to_memory_pool",
        "cName": "blockos_ext_kernel_heap_free_to_memory_pool",
        "label": "free to memory pool",
        "kind": "cmd",
        "args": [
          {
            "name": "pool",
            "type": "Number"
          },
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_kernel_heap_compact_kernel_heap",
        "cName": "blockos_ext_kernel_heap_compact_kernel_heap",
        "label": "compact kernel heap",
        "kind": "cmd",
        "args": []
      }
    ]
  },
  {
    "name": "Processes",
    "colour": 290,
    "blocks": [
      {
        "type": "osx_processes_create_process",
        "cName": "blockos_ext_processes_create_process",
        "label": "create process",
        "kind": "num",
        "args": [
          {
            "name": "name",
            "type": "String"
          },
          {
            "name": "entry address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_terminate_process",
        "cName": "blockos_ext_processes_terminate_process",
        "label": "terminate process",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          },
          {
            "name": "exit code",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_get_current_process_id",
        "cName": "blockos_ext_processes_get_current_process_id",
        "label": "get current process id",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_processes_process_exists",
        "cName": "blockos_ext_processes_process_exists",
        "label": "process exists",
        "kind": "bool",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_set_process_name",
        "cName": "blockos_ext_processes_set_process_name",
        "label": "set process name",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          },
          {
            "name": "name",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_processes_get_process_name",
        "cName": "blockos_ext_processes_get_process_name",
        "label": "get process name",
        "kind": "text",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_set_process_priority",
        "cName": "blockos_ext_processes_set_process_priority",
        "label": "set process priority",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          },
          {
            "name": "priority",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_get_process_priority",
        "cName": "blockos_ext_processes_get_process_priority",
        "label": "get process priority",
        "kind": "num",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_suspend_process",
        "cName": "blockos_ext_processes_suspend_process",
        "label": "suspend process",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_resume_process",
        "cName": "blockos_ext_processes_resume_process",
        "label": "resume process",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_process_is_suspended",
        "cName": "blockos_ext_processes_process_is_suspended",
        "label": "process is suspended",
        "kind": "bool",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_wait_for_process",
        "cName": "blockos_ext_processes_wait_for_process",
        "label": "wait for process",
        "kind": "num",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_get_process_exit_code",
        "cName": "blockos_ext_processes_get_process_exit_code",
        "label": "get process exit code",
        "kind": "num",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_processes_get_process_count",
        "cName": "blockos_ext_processes_get_process_count",
        "label": "get process count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_processes_send_process_signal",
        "cName": "blockos_ext_processes_send_process_signal",
        "label": "send process signal",
        "kind": "cmd",
        "args": [
          {
            "name": "process id",
            "type": "Number"
          },
          {
            "name": "signal",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Threads",
    "colour": 300,
    "blocks": [
      {
        "type": "osx_threads_create_thread",
        "cName": "blockos_ext_threads_create_thread",
        "label": "create thread",
        "kind": "num",
        "args": [
          {
            "name": "entry address",
            "type": "Number"
          },
          {
            "name": "argument",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_exit_current_thread",
        "cName": "blockos_ext_threads_exit_current_thread",
        "label": "exit current thread",
        "kind": "cmd",
        "args": [
          {
            "name": "exit code",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_get_current_thread_id",
        "cName": "blockos_ext_threads_get_current_thread_id",
        "label": "get current thread id",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_threads_thread_exists",
        "cName": "blockos_ext_threads_thread_exists",
        "label": "thread exists",
        "kind": "bool",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_yield_current_thread",
        "cName": "blockos_ext_threads_yield_current_thread",
        "label": "yield current thread",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_threads_sleep_thread_ticks",
        "cName": "blockos_ext_threads_sleep_thread_ticks",
        "label": "sleep thread ticks",
        "kind": "cmd",
        "args": [
          {
            "name": "ticks",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_wake_thread",
        "cName": "blockos_ext_threads_wake_thread",
        "label": "wake thread",
        "kind": "cmd",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_suspend_thread",
        "cName": "blockos_ext_threads_suspend_thread",
        "label": "suspend thread",
        "kind": "cmd",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_resume_thread",
        "cName": "blockos_ext_threads_resume_thread",
        "label": "resume thread",
        "kind": "cmd",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_set_thread_priority",
        "cName": "blockos_ext_threads_set_thread_priority",
        "label": "set thread priority",
        "kind": "cmd",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          },
          {
            "name": "priority",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_get_thread_priority",
        "cName": "blockos_ext_threads_get_thread_priority",
        "label": "get thread priority",
        "kind": "num",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_set_thread_affinity",
        "cName": "blockos_ext_threads_set_thread_affinity",
        "label": "set thread affinity",
        "kind": "cmd",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          },
          {
            "name": "cpu",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_get_thread_affinity",
        "cName": "blockos_ext_threads_get_thread_affinity",
        "label": "get thread affinity",
        "kind": "num",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_join_thread",
        "cName": "blockos_ext_threads_join_thread",
        "label": "join thread",
        "kind": "num",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_threads_get_thread_state",
        "cName": "blockos_ext_threads_get_thread_state",
        "label": "get thread state",
        "kind": "num",
        "args": [
          {
            "name": "thread id",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Synchronization",
    "colour": 315,
    "blocks": [
      {
        "type": "osx_synchronization_create_mutex",
        "cName": "blockos_ext_synchronization_create_mutex",
        "label": "create mutex",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_synchronization_lock_mutex",
        "cName": "blockos_ext_synchronization_lock_mutex",
        "label": "lock mutex",
        "kind": "cmd",
        "args": [
          {
            "name": "mutex",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_try_lock_mutex",
        "cName": "blockos_ext_synchronization_try_lock_mutex",
        "label": "try lock mutex",
        "kind": "bool",
        "args": [
          {
            "name": "mutex",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_unlock_mutex",
        "cName": "blockos_ext_synchronization_unlock_mutex",
        "label": "unlock mutex",
        "kind": "cmd",
        "args": [
          {
            "name": "mutex",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_destroy_mutex",
        "cName": "blockos_ext_synchronization_destroy_mutex",
        "label": "destroy mutex",
        "kind": "cmd",
        "args": [
          {
            "name": "mutex",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_create_semaphore",
        "cName": "blockos_ext_synchronization_create_semaphore",
        "label": "create semaphore",
        "kind": "num",
        "args": [
          {
            "name": "initial value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_wait_semaphore",
        "cName": "blockos_ext_synchronization_wait_semaphore",
        "label": "wait semaphore",
        "kind": "cmd",
        "args": [
          {
            "name": "semaphore",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_try_wait_semaphore",
        "cName": "blockos_ext_synchronization_try_wait_semaphore",
        "label": "try wait semaphore",
        "kind": "bool",
        "args": [
          {
            "name": "semaphore",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_signal_semaphore",
        "cName": "blockos_ext_synchronization_signal_semaphore",
        "label": "signal semaphore",
        "kind": "cmd",
        "args": [
          {
            "name": "semaphore",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_destroy_semaphore",
        "cName": "blockos_ext_synchronization_destroy_semaphore",
        "label": "destroy semaphore",
        "kind": "cmd",
        "args": [
          {
            "name": "semaphore",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_create_spinlock",
        "cName": "blockos_ext_synchronization_create_spinlock",
        "label": "create spinlock",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_synchronization_lock_spinlock",
        "cName": "blockos_ext_synchronization_lock_spinlock",
        "label": "lock spinlock",
        "kind": "cmd",
        "args": [
          {
            "name": "spinlock",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_unlock_spinlock",
        "cName": "blockos_ext_synchronization_unlock_spinlock",
        "label": "unlock spinlock",
        "kind": "cmd",
        "args": [
          {
            "name": "spinlock",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_synchronization_create_event",
        "cName": "blockos_ext_synchronization_create_event",
        "label": "create event",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_synchronization_set_event",
        "cName": "blockos_ext_synchronization_set_event",
        "label": "set event",
        "kind": "cmd",
        "args": [
          {
            "name": "event",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Timers and clock",
    "colour": 110,
    "blocks": [
      {
        "type": "osx_timers_and_clock_initialize_system_timer",
        "cName": "blockos_ext_timers_and_clock_initialize_system_timer",
        "label": "initialize system timer",
        "kind": "cmd",
        "args": [
          {
            "name": "frequency",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_get_timer_frequency",
        "cName": "blockos_ext_timers_and_clock_get_timer_frequency",
        "label": "get timer frequency",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_timers_and_clock_get_monotonic_ticks",
        "cName": "blockos_ext_timers_and_clock_get_monotonic_ticks",
        "label": "get monotonic ticks",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_timers_and_clock_convert_ticks_to_milliseconds",
        "cName": "blockos_ext_timers_and_clock_convert_ticks_to_milliseconds",
        "label": "convert ticks to milliseconds",
        "kind": "num",
        "args": [
          {
            "name": "ticks",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_convert_milliseconds_to_ticks",
        "cName": "blockos_ext_timers_and_clock_convert_milliseconds_to_ticks",
        "label": "convert milliseconds to ticks",
        "kind": "num",
        "args": [
          {
            "name": "milliseconds",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_sleep_milliseconds",
        "cName": "blockos_ext_timers_and_clock_sleep_milliseconds",
        "label": "sleep milliseconds",
        "kind": "cmd",
        "args": [
          {
            "name": "milliseconds",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_create_one_shot_timer",
        "cName": "blockos_ext_timers_and_clock_create_one_shot_timer",
        "label": "create one shot timer",
        "kind": "num",
        "args": [
          {
            "name": "delay",
            "type": "Number"
          },
          {
            "name": "callback address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_create_repeating_timer",
        "cName": "blockos_ext_timers_and_clock_create_repeating_timer",
        "label": "create repeating timer",
        "kind": "num",
        "args": [
          {
            "name": "period",
            "type": "Number"
          },
          {
            "name": "callback address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_cancel_timer",
        "cName": "blockos_ext_timers_and_clock_cancel_timer",
        "label": "cancel timer",
        "kind": "cmd",
        "args": [
          {
            "name": "timer id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_timer_is_active",
        "cName": "blockos_ext_timers_and_clock_timer_is_active",
        "label": "timer is active",
        "kind": "bool",
        "args": [
          {
            "name": "timer id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_get_timer_remaining_ticks",
        "cName": "blockos_ext_timers_and_clock_get_timer_remaining_ticks",
        "label": "get timer remaining ticks",
        "kind": "num",
        "args": [
          {
            "name": "timer id",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_reset_timer",
        "cName": "blockos_ext_timers_and_clock_reset_timer",
        "label": "reset timer",
        "kind": "cmd",
        "args": [
          {
            "name": "timer id",
            "type": "Number"
          },
          {
            "name": "delay",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_set_wall_clock_seconds",
        "cName": "blockos_ext_timers_and_clock_set_wall_clock_seconds",
        "label": "set wall clock seconds",
        "kind": "cmd",
        "args": [
          {
            "name": "seconds",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_timers_and_clock_get_wall_clock_seconds",
        "cName": "blockos_ext_timers_and_clock_get_wall_clock_seconds",
        "label": "get wall clock seconds",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_timers_and_clock_get_monotonic_nanoseconds",
        "cName": "blockos_ext_timers_and_clock_get_monotonic_nanoseconds",
        "label": "get monotonic nanoseconds",
        "kind": "num",
        "args": []
      }
    ]
  },
  {
    "name": "Keyboard and mouse",
    "colour": 185,
    "blocks": [
      {
        "type": "osx_keyboard_and_mouse_initialize_keyboard",
        "cName": "blockos_ext_keyboard_and_mouse_initialize_keyboard",
        "label": "initialize keyboard",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_keyboard_key_available",
        "cName": "blockos_ext_keyboard_and_mouse_keyboard_key_available",
        "label": "keyboard key available",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_read_keyboard_key_code",
        "cName": "blockos_ext_keyboard_and_mouse_read_keyboard_key_code",
        "label": "read keyboard key code",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_read_keyboard_character",
        "cName": "blockos_ext_keyboard_and_mouse_read_keyboard_character",
        "label": "read keyboard character",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_keyboard_key_is_pressed",
        "cName": "blockos_ext_keyboard_and_mouse_keyboard_key_is_pressed",
        "label": "keyboard key is pressed",
        "kind": "bool",
        "args": [
          {
            "name": "key code",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_keyboard_and_mouse_initialize_mouse",
        "cName": "blockos_ext_keyboard_and_mouse_initialize_mouse",
        "label": "initialize mouse",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_get_mouse_x",
        "cName": "blockos_ext_keyboard_and_mouse_get_mouse_x",
        "label": "get mouse x",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_get_mouse_y",
        "cName": "blockos_ext_keyboard_and_mouse_get_mouse_y",
        "label": "get mouse y",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_get_mouse_button_mask",
        "cName": "blockos_ext_keyboard_and_mouse_get_mouse_button_mask",
        "label": "get mouse button mask",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_set_mouse_position",
        "cName": "blockos_ext_keyboard_and_mouse_set_mouse_position",
        "label": "set mouse position",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_keyboard_and_mouse_mouse_button_is_pressed",
        "cName": "blockos_ext_keyboard_and_mouse_mouse_button_is_pressed",
        "label": "mouse button is pressed",
        "kind": "bool",
        "args": [
          {
            "name": "button",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_keyboard_and_mouse_set_mouse_cursor_visible",
        "cName": "blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible",
        "label": "set mouse cursor visible",
        "kind": "cmd",
        "args": [
          {
            "name": "visible",
            "type": "Boolean"
          }
        ]
      },
      {
        "type": "osx_keyboard_and_mouse_mouse_cursor_is_visible",
        "cName": "blockos_ext_keyboard_and_mouse_mouse_cursor_is_visible",
        "label": "mouse cursor is visible",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_get_mouse_scroll_delta",
        "cName": "blockos_ext_keyboard_and_mouse_get_mouse_scroll_delta",
        "label": "get mouse scroll delta",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_keyboard_and_mouse_clear_input_queue",
        "cName": "blockos_ext_keyboard_and_mouse_clear_input_queue",
        "label": "clear input queue",
        "kind": "cmd",
        "args": []
      }
    ]
  },
  {
    "name": "Graphics",
    "colour": 165,
    "blocks": [
      {
        "type": "osx_graphics_initialize_framebuffer",
        "cName": "blockos_ext_graphics_initialize_framebuffer",
        "label": "initialize framebuffer",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_graphics_get_screen_width",
        "cName": "blockos_ext_graphics_get_screen_width",
        "label": "get screen width",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_graphics_get_screen_height",
        "cName": "blockos_ext_graphics_get_screen_height",
        "label": "get screen height",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_graphics_get_framebuffer_pitch",
        "cName": "blockos_ext_graphics_get_framebuffer_pitch",
        "label": "get framebuffer pitch",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_graphics_get_framebuffer_bits_per_pixel",
        "cName": "blockos_ext_graphics_get_framebuffer_bits_per_pixel",
        "label": "get framebuffer bits per pixel",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_graphics_draw_horizontal_line",
        "cName": "blockos_ext_graphics_draw_horizontal_line",
        "label": "draw horizontal line",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_draw_vertical_line",
        "cName": "blockos_ext_graphics_draw_vertical_line",
        "label": "draw vertical line",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_draw_rectangle_outline",
        "cName": "blockos_ext_graphics_draw_rectangle_outline",
        "label": "draw rectangle outline",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_fill_rectangle",
        "cName": "blockos_ext_graphics_fill_rectangle",
        "label": "fill rectangle",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_draw_circle_outline",
        "cName": "blockos_ext_graphics_draw_circle_outline",
        "label": "draw circle outline",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "radius",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_fill_circle",
        "cName": "blockos_ext_graphics_fill_circle",
        "label": "fill circle",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "radius",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_draw_bitmap",
        "cName": "blockos_ext_graphics_draw_bitmap",
        "label": "draw bitmap",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "address",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_swap_graphics_buffers",
        "cName": "blockos_ext_graphics_swap_graphics_buffers",
        "label": "swap graphics buffers",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_graphics_set_clipping_rectangle",
        "cName": "blockos_ext_graphics_set_clipping_rectangle",
        "label": "set clipping rectangle",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_clear_clipping_rectangle",
        "cName": "blockos_ext_graphics_clear_clipping_rectangle",
        "label": "clear clipping rectangle",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_graphics_draw_pixel_line_fast",
        "cName": "blockos_ext_graphics_draw_pixel_line_fast",
        "label": "draw fast pixel line",
        "kind": "cmd",
        "args": [
          {
            "name": "x1",
            "type": "Number"
          },
          {
            "name": "y1",
            "type": "Number"
          },
          {
            "name": "x2",
            "type": "Number"
          },
          {
            "name": "y2",
            "type": "Number"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_save_screen_region",
        "cName": "blockos_ext_graphics_save_screen_region",
        "label": "save screen region",
        "kind": "cmd",
        "args": [
          {
            "name": "slot 0-7",
            "type": "Number"
          },
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width max 64",
            "type": "Number"
          },
          {
            "name": "height max 64",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_restore_screen_region",
        "cName": "blockos_ext_graphics_restore_screen_region",
        "label": "restore saved screen region",
        "kind": "cmd",
        "args": [
          {
            "name": "slot 0-7",
            "type": "Number"
          },
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_copy_screen_region",
        "cName": "blockos_ext_graphics_copy_screen_region",
        "label": "copy screen region",
        "kind": "cmd",
        "args": [
          {
            "name": "source x",
            "type": "Number"
          },
          {
            "name": "source y",
            "type": "Number"
          },
          {
            "name": "destination x",
            "type": "Number"
          },
          {
            "name": "destination y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_draw_fast_mouse_cursor",
        "cName": "blockos_ext_graphics_draw_fast_mouse_cursor",
        "label": "draw fast mouse cursor",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_enable_back_buffer",
        "cName": "blockos_ext_graphics_enable_back_buffer",
        "label": "enable graphics back buffer",
        "kind": "cmd",
        "args": [
          {
            "name": "enabled",
            "type": "Boolean"
          }
        ]
      },
      {
        "type": "osx_graphics_present_changed_rectangle",
        "cName": "blockos_ext_graphics_present_changed_rectangle",
        "label": "present changed rectangle",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_graphics_present_full_frame",
        "cName": "blockos_ext_graphics_present_full_frame",
        "label": "present full graphics frame",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_graphics_draw_transparent_sprite",
        "cName": "blockos_ext_graphics_draw_transparent_sprite",
        "label": "draw transparent 32-bit sprite",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "address",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          },
          {
            "name": "transparent colour",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Text and windows",
    "colour": 195,
    "blocks": [
      {
        "type": "osx_text_and_windows_set_text_cursor_position",
        "cName": "blockos_ext_text_and_windows_set_text_cursor_position",
        "label": "set text cursor position",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_get_text_cursor_x",
        "cName": "blockos_ext_text_and_windows_get_text_cursor_x",
        "label": "get text cursor x",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_text_and_windows_get_text_cursor_y",
        "cName": "blockos_ext_text_and_windows_get_text_cursor_y",
        "label": "get text cursor y",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_text_and_windows_set_text_colours",
        "cName": "blockos_ext_text_and_windows_set_text_colours",
        "label": "set text colours",
        "kind": "cmd",
        "args": [
          {
            "name": "foreground",
            "type": "Number"
          },
          {
            "name": "background",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_print_line",
        "cName": "blockos_ext_text_and_windows_print_line",
        "label": "print line",
        "kind": "cmd",
        "args": [
          {
            "name": "text",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_print_hexadecimal_number",
        "cName": "blockos_ext_text_and_windows_print_hexadecimal_number",
        "label": "print hexadecimal number",
        "kind": "cmd",
        "args": [
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_draw_text_at_position",
        "cName": "blockos_ext_text_and_windows_draw_text_at_position",
        "label": "draw text at position",
        "kind": "cmd",
        "args": [
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "text",
            "type": "String"
          },
          {
            "name": "colour",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_measure_text_width",
        "cName": "blockos_ext_text_and_windows_measure_text_width",
        "label": "measure text width",
        "kind": "num",
        "args": [
          {
            "name": "text",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_measure_text_height",
        "cName": "blockos_ext_text_and_windows_measure_text_height",
        "label": "measure text height",
        "kind": "num",
        "args": [
          {
            "name": "text",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_create_window",
        "cName": "blockos_ext_text_and_windows_create_window",
        "label": "create window",
        "kind": "num",
        "args": [
          {
            "name": "title",
            "type": "String"
          },
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_destroy_window",
        "cName": "blockos_ext_text_and_windows_destroy_window",
        "label": "destroy window",
        "kind": "cmd",
        "args": [
          {
            "name": "window",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_move_window",
        "cName": "blockos_ext_text_and_windows_move_window",
        "label": "move window",
        "kind": "cmd",
        "args": [
          {
            "name": "window",
            "type": "Number"
          },
          {
            "name": "x",
            "type": "Number"
          },
          {
            "name": "y",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_resize_window",
        "cName": "blockos_ext_text_and_windows_resize_window",
        "label": "resize window",
        "kind": "cmd",
        "args": [
          {
            "name": "window",
            "type": "Number"
          },
          {
            "name": "width",
            "type": "Number"
          },
          {
            "name": "height",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_show_window",
        "cName": "blockos_ext_text_and_windows_show_window",
        "label": "show window",
        "kind": "cmd",
        "args": [
          {
            "name": "window",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_text_and_windows_window_is_visible",
        "cName": "blockos_ext_text_and_windows_window_is_visible",
        "label": "window is visible",
        "kind": "bool",
        "args": [
          {
            "name": "window",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Storage devices",
    "colour": 30,
    "blocks": [
      {
        "type": "osx_storage_devices_get_disk_count",
        "cName": "blockos_ext_storage_devices_get_disk_count",
        "label": "get disk count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_storage_devices_get_disk_size_bytes",
        "cName": "blockos_ext_storage_devices_get_disk_size_bytes",
        "label": "get disk size bytes",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_read_disk_sectors",
        "cName": "blockos_ext_storage_devices_read_disk_sectors",
        "label": "read disk sectors",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          },
          {
            "name": "lba",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "count",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_write_disk_sectors",
        "cName": "blockos_ext_storage_devices_write_disk_sectors",
        "label": "write disk sectors",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          },
          {
            "name": "lba",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "count",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_flush_disk_cache",
        "cName": "blockos_ext_storage_devices_flush_disk_cache",
        "label": "flush disk cache",
        "kind": "cmd",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_disk_is_present",
        "cName": "blockos_ext_storage_devices_disk_is_present",
        "label": "disk is present",
        "kind": "bool",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_disk_is_read_only",
        "cName": "blockos_ext_storage_devices_disk_is_read_only",
        "label": "disk is read only",
        "kind": "bool",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_get_disk_sector_size",
        "cName": "blockos_ext_storage_devices_get_disk_sector_size",
        "label": "get disk sector size",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_create_block_request",
        "cName": "blockos_ext_storage_devices_create_block_request",
        "label": "create block request",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          },
          {
            "name": "lba",
            "type": "Number"
          },
          {
            "name": "count",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_wait_for_block_request",
        "cName": "blockos_ext_storage_devices_wait_for_block_request",
        "label": "wait for block request",
        "kind": "num",
        "args": [
          {
            "name": "request",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_cancel_block_request",
        "cName": "blockos_ext_storage_devices_cancel_block_request",
        "label": "cancel block request",
        "kind": "cmd",
        "args": [
          {
            "name": "request",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_get_block_request_status",
        "cName": "blockos_ext_storage_devices_get_block_request_status",
        "label": "get block request status",
        "kind": "num",
        "args": [
          {
            "name": "request",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_get_partition_count",
        "cName": "blockos_ext_storage_devices_get_partition_count",
        "label": "get partition count",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_get_partition_start_lba",
        "cName": "blockos_ext_storage_devices_get_partition_start_lba",
        "label": "get partition start lba",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          },
          {
            "name": "partition",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_storage_devices_get_partition_size_sectors",
        "cName": "blockos_ext_storage_devices_get_partition_size_sectors",
        "label": "get partition size sectors",
        "kind": "num",
        "args": [
          {
            "name": "disk",
            "type": "Number"
          },
          {
            "name": "partition",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Filesystems",
    "colour": 55,
    "blocks": [
      {
        "type": "osx_filesystems_mount_filesystem",
        "cName": "blockos_ext_filesystems_mount_filesystem",
        "label": "mount filesystem",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "String"
          },
          {
            "name": "path",
            "type": "String"
          },
          {
            "name": "type",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_unmount_filesystem",
        "cName": "blockos_ext_filesystems_unmount_filesystem",
        "label": "unmount filesystem",
        "kind": "cmd",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_filesystem_is_mounted",
        "cName": "blockos_ext_filesystems_filesystem_is_mounted",
        "label": "filesystem is mounted",
        "kind": "bool",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_open_file",
        "cName": "blockos_ext_filesystems_open_file",
        "label": "open file",
        "kind": "num",
        "args": [
          {
            "name": "path",
            "type": "String"
          },
          {
            "name": "flags",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_close_file",
        "cName": "blockos_ext_filesystems_close_file",
        "label": "close file",
        "kind": "cmd",
        "args": [
          {
            "name": "handle",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_read_file_bytes",
        "cName": "blockos_ext_filesystems_read_file_bytes",
        "label": "read file bytes",
        "kind": "num",
        "args": [
          {
            "name": "handle",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_write_file_bytes",
        "cName": "blockos_ext_filesystems_write_file_bytes",
        "label": "write file bytes",
        "kind": "num",
        "args": [
          {
            "name": "handle",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_seek_file",
        "cName": "blockos_ext_filesystems_seek_file",
        "label": "seek file",
        "kind": "num",
        "args": [
          {
            "name": "handle",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          },
          {
            "name": "mode",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_get_file_size",
        "cName": "blockos_ext_filesystems_get_file_size",
        "label": "get file size",
        "kind": "num",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_file_exists",
        "cName": "blockos_ext_filesystems_file_exists",
        "label": "file exists",
        "kind": "bool",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_create_directory",
        "cName": "blockos_ext_filesystems_create_directory",
        "label": "create directory",
        "kind": "cmd",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_remove_file",
        "cName": "blockos_ext_filesystems_remove_file",
        "label": "remove file",
        "kind": "cmd",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_get_directory_entry_count",
        "cName": "blockos_ext_filesystems_get_directory_entry_count",
        "label": "get directory entry count",
        "kind": "num",
        "args": [
          {
            "name": "path",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_filesystems_get_directory_entry_name",
        "cName": "blockos_ext_filesystems_get_directory_entry_name",
        "label": "get directory entry name",
        "kind": "text",
        "args": [
          {
            "name": "path",
            "type": "String"
          },
          {
            "name": "index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_filesystems_sync_all_filesystems",
        "cName": "blockos_ext_filesystems_sync_all_filesystems",
        "label": "sync all filesystems",
        "kind": "cmd",
        "args": []
      }
    ]
  },
  {
    "name": "PCI and devices",
    "colour": 10,
    "blocks": [
      {
        "type": "osx_pci_and_devices_scan_pci_bus",
        "cName": "blockos_ext_pci_and_devices_scan_pci_bus",
        "label": "scan PCI bus",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_pci_and_devices_get_pci_device_count",
        "cName": "blockos_ext_pci_and_devices_get_pci_device_count",
        "label": "get PCI device count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_pci_and_devices_get_pci_vendor_id",
        "cName": "blockos_ext_pci_and_devices_get_pci_vendor_id",
        "label": "get PCI vendor id",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_get_pci_device_id",
        "cName": "blockos_ext_pci_and_devices_get_pci_device_id",
        "label": "get PCI device id",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_get_pci_class_code",
        "cName": "blockos_ext_pci_and_devices_get_pci_class_code",
        "label": "get PCI class code",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_get_pci_bus_number",
        "cName": "blockos_ext_pci_and_devices_get_pci_bus_number",
        "label": "get PCI bus number",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_get_pci_slot_number",
        "cName": "blockos_ext_pci_and_devices_get_pci_slot_number",
        "label": "get PCI slot number",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_get_pci_function_number",
        "cName": "blockos_ext_pci_and_devices_get_pci_function_number",
        "label": "get PCI function number",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_read_pci_config_byte",
        "cName": "blockos_ext_pci_and_devices_read_pci_config_byte",
        "label": "read PCI config byte",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_read_pci_config_word",
        "cName": "blockos_ext_pci_and_devices_read_pci_config_word",
        "label": "read PCI config word",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_read_pci_config_dword",
        "cName": "blockos_ext_pci_and_devices_read_pci_config_dword",
        "label": "read PCI config dword",
        "kind": "num",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_write_pci_config_byte",
        "cName": "blockos_ext_pci_and_devices_write_pci_config_byte",
        "label": "write PCI config byte",
        "kind": "cmd",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          },
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_write_pci_config_word",
        "cName": "blockos_ext_pci_and_devices_write_pci_config_word",
        "label": "write PCI config word",
        "kind": "cmd",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          },
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_write_pci_config_dword",
        "cName": "blockos_ext_pci_and_devices_write_pci_config_dword",
        "label": "write PCI config dword",
        "kind": "cmd",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          },
          {
            "name": "offset",
            "type": "Number"
          },
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_pci_and_devices_enable_pci_bus_mastering",
        "cName": "blockos_ext_pci_and_devices_enable_pci_bus_mastering",
        "label": "enable PCI bus mastering",
        "kind": "cmd",
        "args": [
          {
            "name": "device index",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "USB",
    "colour": 20,
    "blocks": [
      {
        "type": "osx_usb_initialize_usb_subsystem",
        "cName": "blockos_ext_usb_initialize_usb_subsystem",
        "label": "initialize USB subsystem",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_usb_get_usb_controller_count",
        "cName": "blockos_ext_usb_get_usb_controller_count",
        "label": "get USB controller count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_usb_get_usb_device_count",
        "cName": "blockos_ext_usb_get_usb_device_count",
        "label": "get USB device count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_usb_get_usb_vendor_id",
        "cName": "blockos_ext_usb_get_usb_vendor_id",
        "label": "get USB vendor id",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_get_usb_product_id",
        "cName": "blockos_ext_usb_get_usb_product_id",
        "label": "get USB product id",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_get_usb_class_code",
        "cName": "blockos_ext_usb_get_usb_class_code",
        "label": "get USB class code",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_get_usb_address",
        "cName": "blockos_ext_usb_get_usb_address",
        "label": "get USB address",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_configure_usb_device",
        "cName": "blockos_ext_usb_configure_usb_device",
        "label": "configure USB device",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_reset_usb_device",
        "cName": "blockos_ext_usb_reset_usb_device",
        "label": "reset USB device",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_submit_usb_control_transfer",
        "cName": "blockos_ext_usb_submit_usb_control_transfer",
        "label": "submit USB control transfer",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          },
          {
            "name": "request",
            "type": "Number"
          },
          {
            "name": "value",
            "type": "Number"
          },
          {
            "name": "index",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_submit_usb_bulk_transfer",
        "cName": "blockos_ext_usb_submit_usb_bulk_transfer",
        "label": "submit USB bulk transfer",
        "kind": "num",
        "args": [
          {
            "name": "device",
            "type": "Number"
          },
          {
            "name": "endpoint",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_cancel_usb_transfer",
        "cName": "blockos_ext_usb_cancel_usb_transfer",
        "label": "cancel USB transfer",
        "kind": "cmd",
        "args": [
          {
            "name": "transfer",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_wait_for_usb_transfer",
        "cName": "blockos_ext_usb_wait_for_usb_transfer",
        "label": "wait for USB transfer",
        "kind": "num",
        "args": [
          {
            "name": "transfer",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_get_usb_transfer_byte_count",
        "cName": "blockos_ext_usb_get_usb_transfer_byte_count",
        "label": "get USB transfer byte count",
        "kind": "num",
        "args": [
          {
            "name": "transfer",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_usb_usb_device_is_connected",
        "cName": "blockos_ext_usb_usb_device_is_connected",
        "label": "USB device is connected",
        "kind": "bool",
        "args": [
          {
            "name": "device",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Networking",
    "colour": 205,
    "blocks": [
      {
        "type": "osx_networking_initialize_network_stack",
        "cName": "blockos_ext_networking_initialize_network_stack",
        "label": "initialize network stack",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_networking_get_network_interface_count",
        "cName": "blockos_ext_networking_get_network_interface_count",
        "label": "get network interface count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_networking_bring_network_interface_up",
        "cName": "blockos_ext_networking_bring_network_interface_up",
        "label": "bring network interface up",
        "kind": "cmd",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_bring_network_interface_down",
        "cName": "blockos_ext_networking_bring_network_interface_down",
        "label": "bring network interface down",
        "kind": "cmd",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_network_interface_is_up",
        "cName": "blockos_ext_networking_network_interface_is_up",
        "label": "network interface is up",
        "kind": "bool",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_set_ipv4_address",
        "cName": "blockos_ext_networking_set_ipv4_address",
        "label": "set IPv4 address",
        "kind": "cmd",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          },
          {
            "name": "address",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_get_ipv4_address",
        "cName": "blockos_ext_networking_get_ipv4_address",
        "label": "get IPv4 address",
        "kind": "num",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_set_ipv4_subnet_mask",
        "cName": "blockos_ext_networking_set_ipv4_subnet_mask",
        "label": "set IPv4 subnet mask",
        "kind": "cmd",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          },
          {
            "name": "mask",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_set_ipv4_gateway",
        "cName": "blockos_ext_networking_set_ipv4_gateway",
        "label": "set IPv4 gateway",
        "kind": "cmd",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          },
          {
            "name": "gateway",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_send_ethernet_frame",
        "cName": "blockos_ext_networking_send_ethernet_frame",
        "label": "send ethernet frame",
        "kind": "num",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_receive_ethernet_frame",
        "cName": "blockos_ext_networking_receive_ethernet_frame",
        "label": "receive ethernet frame",
        "kind": "num",
        "args": [
          {
            "name": "interface",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "maximum",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_open_udp_socket",
        "cName": "blockos_ext_networking_open_udp_socket",
        "label": "open UDP socket",
        "kind": "num",
        "args": [
          {
            "name": "port",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_send_udp_packet",
        "cName": "blockos_ext_networking_send_udp_packet",
        "label": "send UDP packet",
        "kind": "num",
        "args": [
          {
            "name": "socket",
            "type": "Number"
          },
          {
            "name": "address",
            "type": "Number"
          },
          {
            "name": "port",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "length",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_receive_udp_packet",
        "cName": "blockos_ext_networking_receive_udp_packet",
        "label": "receive UDP packet",
        "kind": "num",
        "args": [
          {
            "name": "socket",
            "type": "Number"
          },
          {
            "name": "buffer",
            "type": "Number"
          },
          {
            "name": "maximum",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_networking_close_network_socket",
        "cName": "blockos_ext_networking_close_network_socket",
        "label": "close network socket",
        "kind": "cmd",
        "args": [
          {
            "name": "socket",
            "type": "Number"
          }
        ]
      }
    ]
  },
  {
    "name": "Audio",
    "colour": 260,
    "blocks": [
      {
        "type": "osx_audio_initialize_audio_subsystem",
        "cName": "blockos_ext_audio_initialize_audio_subsystem",
        "label": "initialize audio subsystem",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_audio_get_audio_device_count",
        "cName": "blockos_ext_audio_get_audio_device_count",
        "label": "get audio device count",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_audio_set_master_volume",
        "cName": "blockos_ext_audio_set_master_volume",
        "label": "set master volume",
        "kind": "cmd",
        "args": [
          {
            "name": "volume",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_audio_get_master_volume",
        "cName": "blockos_ext_audio_get_master_volume",
        "label": "get master volume",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_audio_set_audio_muted",
        "cName": "blockos_ext_audio_set_audio_muted",
        "label": "set audio muted",
        "kind": "cmd",
        "args": [
          {
            "name": "muted",
            "type": "Boolean"
          }
        ]
      },
      {
        "type": "osx_audio_audio_is_muted",
        "cName": "blockos_ext_audio_audio_is_muted",
        "label": "audio is muted",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_audio_set_audio_sample_rate",
        "cName": "blockos_ext_audio_set_audio_sample_rate",
        "label": "set audio sample rate",
        "kind": "cmd",
        "args": [
          {
            "name": "sample rate",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_audio_get_audio_sample_rate",
        "cName": "blockos_ext_audio_get_audio_sample_rate",
        "label": "get audio sample rate",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_audio_play_audio_tone",
        "cName": "blockos_ext_audio_play_audio_tone",
        "label": "play audio tone",
        "kind": "cmd",
        "args": [
          {
            "name": "frequency",
            "type": "Number"
          },
          {
            "name": "duration ms",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_audio_stop_audio_tone",
        "cName": "blockos_ext_audio_stop_audio_tone",
        "label": "stop audio tone",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_audio_submit_audio_buffer",
        "cName": "blockos_ext_audio_submit_audio_buffer",
        "label": "submit audio buffer",
        "kind": "num",
        "args": [
          {
            "name": "address",
            "type": "Number"
          },
          {
            "name": "frames",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_audio_audio_buffer_space_available",
        "cName": "blockos_ext_audio_audio_buffer_space_available",
        "label": "audio buffer space available",
        "kind": "bool",
        "args": []
      },
      {
        "type": "osx_audio_get_audio_playback_position",
        "cName": "blockos_ext_audio_get_audio_playback_position",
        "label": "get audio playback position",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_audio_pause_audio_playback",
        "cName": "blockos_ext_audio_pause_audio_playback",
        "label": "pause audio playback",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_audio_resume_audio_playback",
        "cName": "blockos_ext_audio_resume_audio_playback",
        "label": "resume audio playback",
        "kind": "cmd",
        "args": []
      }
    ]
  },
  {
    "name": "Debug and information",
    "colour": 60,
    "blocks": [
      {
        "type": "osx_debug_and_information_write_debug_text",
        "cName": "blockos_ext_debug_and_information_write_debug_text",
        "label": "write debug text",
        "kind": "cmd",
        "args": [
          {
            "name": "text",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_write_debug_number",
        "cName": "blockos_ext_debug_and_information_write_debug_number",
        "label": "write debug number",
        "kind": "cmd",
        "args": [
          {
            "name": "value",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_set_debug_log_level",
        "cName": "blockos_ext_debug_and_information_set_debug_log_level",
        "label": "set debug log level",
        "kind": "cmd",
        "args": [
          {
            "name": "level",
            "type": "Number"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_get_debug_log_level",
        "cName": "blockos_ext_debug_and_information_get_debug_log_level",
        "label": "get debug log level",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_debug_and_information_begin_trace_event",
        "cName": "blockos_ext_debug_and_information_begin_trace_event",
        "label": "begin trace event",
        "kind": "cmd",
        "args": [
          {
            "name": "name",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_end_trace_event",
        "cName": "blockos_ext_debug_and_information_end_trace_event",
        "label": "end trace event",
        "kind": "cmd",
        "args": [
          {
            "name": "name",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_assert_condition",
        "cName": "blockos_ext_debug_and_information_assert_condition",
        "label": "assert condition",
        "kind": "cmd",
        "args": [
          {
            "name": "condition",
            "type": "Boolean"
          },
          {
            "name": "message",
            "type": "String"
          }
        ]
      },
      {
        "type": "osx_debug_and_information_get_last_error_code",
        "cName": "blockos_ext_debug_and_information_get_last_error_code",
        "label": "get last error code",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_debug_and_information_clear_last_error",
        "cName": "blockos_ext_debug_and_information_clear_last_error",
        "label": "clear last error",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_debug_and_information_trigger_debugger_breakpoint",
        "cName": "blockos_ext_debug_and_information_trigger_debugger_breakpoint",
        "label": "trigger debugger breakpoint",
        "kind": "cmd",
        "args": []
      },
      {
        "type": "osx_debug_and_information_get_kernel_build_number",
        "cName": "blockos_ext_debug_and_information_get_kernel_build_number",
        "label": "get kernel build number",
        "kind": "num",
        "args": []
      },
      {
        "type": "osx_debug_and_information_get_architecture_name",
        "cName": "blockos_ext_debug_and_information_get_architecture_name",
        "label": "get architecture name",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_debug_and_information_get_compiler_name",
        "cName": "blockos_ext_debug_and_information_get_compiler_name",
        "label": "get compiler name",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_debug_and_information_get_runtime_version",
        "cName": "blockos_ext_debug_and_information_get_runtime_version",
        "label": "get runtime version",
        "kind": "text",
        "args": []
      },
      {
        "type": "osx_debug_and_information_dump_system_state",
        "cName": "blockos_ext_debug_and_information_dump_system_state",
        "label": "dump system state",
        "kind": "cmd",
        "args": []
      }
    ]
  }
];

export const extensionBlocks = extensionCategories.flatMap((category) =>
  category.blocks.map((block) => ({...block, category: category.name, colour: category.colour})),
);

if (extensionBlocks.length !== 309) {
  throw new Error(`Expected 309 extension blocks, got ${extensionBlocks.length}`);
}
