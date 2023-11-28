from flask import render_template, abort, url_for

from app.models.proposals import Proposals
from . import bp, decorator_group


@decorator_group("/rejected/<int:proposal_id>", methods=["GET"])
def view_rejected(proposal_id):
    proposal = Proposals.select_using_proposal_id(proposal_id)
    if not proposal:
        return abort(404)

    breadcrumbs = [
        ("Proposals Dashboard", url_for('staff_only.proposals.dashboard')),
        ("Rejected Proposals", url_for('staff_only.proposals.rejected')),
        (proposal.title, None)
    ]

    external_post = True
    redirect_to = 'proposals.rejected'

    return render_template(
        bp.tmpl("review-proposal.html"),
        rejected_view=True,
        proposal=proposal,
        breadcrumbs=breadcrumbs,
        external_post=external_post,
        redirect_to=redirect_to
    )
