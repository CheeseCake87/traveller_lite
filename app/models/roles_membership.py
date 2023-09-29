from . import *


class RolesMembership(db.Model, MetaMixins):
    roles_membership_id = db.Column(db.Integer, primary_key=True)
    fk_account_id = db.Column(db.Integer, db.ForeignKey("accounts.account_id"), nullable=False)
    fk_role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"), nullable=False)

    rel_role = relationship(
        "Roles",
        order_by="Roles.name",
        primaryjoin="RolesMembership.fk_role_id==Roles.role_id",
        viewonly=True,
    )

    rel_account = relationship(
        "Accounts",
        order_by="Accounts.email_address",
        primaryjoin="RolesMembership.fk_account_id==Accounts.account_id",
        viewonly=True,
    )

    @classmethod
    def get_by_account_id(cls, fk_account_id: int):
        result = db.session.execute(
            select(cls).filter_by(fk_account_id=fk_account_id)
        ).scalars().all()
        return [(role_membership.fk_role_id, role_membership.rel_role.name) for role_membership in result]

    @classmethod
    def set_roles(cls, account_id: int, role_ids: list[int]):
        current_roles = cls.get_by_account_id(account_id)

        already_has = [role_id for role_id, _ in current_roles if role_id in role_ids]
        to_add = [role_id for role_id in role_ids if role_id not in already_has]
        to_remove = [role_id for role_id, _ in current_roles if role_id not in role_ids]

        db.session.execute(
            delete(cls).where(
                and_(cls.fk_account_id == account_id, cls.fk_role_id.in_(to_remove))
            )
        )

        for role_id in to_add:
            db.session.execute(
                insert(cls).values(
                    fk_account_id=account_id,
                    fk_role_id=role_id,
                )
            )

        db.session.commit()

    @classmethod
    def is_proposal_reviewer(cls, account_id: int):
        account_roles = cls.get_by_account_id(account_id)
        if "Proposal Reviewer" in [role for _, role in account_roles]:
            return True
        return False

    @classmethod
    def is_administrator(cls, account_id: int):
        account_roles = cls.get_by_account_id(account_id)
        roles = [role for _, role in account_roles]
        if "Administrator" in roles or "Super Administrator" in roles:
            return True
        return False
